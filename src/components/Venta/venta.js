import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../Venta/venta.css'

class Venta extends Component{
    constructor(props){
        super(props);
        this.state = {
            ventaTotal: "",
            ventas: [],
            busqueda: ""
        }
    }

    apiCall(url, consecuencia){
        fetch(url)
        .then( response => response.json())
        .then( data => consecuencia(data))
    }

    componentDidMount(){
        //VENTAS
        this.apiCall('https://petlandia.onrender.com/api/ventas', this.mostrarTotalVenta)
        this.apiCall('https://petlandia.onrender.com/api/ventas', this.mostrarVentas)
    }

    //USUARIOS
    mostrarTotalVenta = (data) => {
        this.setState({
            ventaTotal: data.total
        })
    }

    mostrarVentas = (data) => {
        this.setState({
            ventas: data.data
        })
    }

    barraBusqueda = (e) => {
        this.setState({
            busqueda: e.target.value
        });
    }

    render() {

        let totalVentas;
        let { busqueda, ventas } = this.state;

        if (this.state.ventaTotal === "") {
            totalVentas = <p>Cargando...</p>;
            } else {
            totalVentas = <p>{this.state.ventaTotal}</p>;
        }

        let ventasFiltradas = ventas.filter(venta =>
            venta.ID.toString().includes(busqueda) ||
            venta.Usuarios.Nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            venta.Usuarios.Apellido.toLowerCase().includes(busqueda.toLowerCase())
        );

        ventasFiltradas = ventasFiltradas.map(venta => (
            <tr className='listado-info'  key={venta.ID}>
                <td>{venta.ID}</td>
                <td>${venta.Precio_Total}</td>
                <td>{venta.Cantidad_Total}</td>
                <td>${venta.Costo_Envio}</td>
                <td>{venta.Usuarios.Nombre}{" "}{venta.Usuarios.Apellido}</td>
                <td><Link to={`/venta/${venta.ID}`}>Ver detalle</Link></td>
            </tr>
        ));
    
        return (
            <div>
                <div className='main-menu'>
                    <div className='nav-menu'>
                        <h2>Ventas</h2>
                        <div className='venta-id'>
                            <label>Buscar Venta:</label>
                            <input type='text' value={busqueda} onChange={this.barraBusqueda}></input>
                        </div>
                        <div className='venta-total'>
                            <p>Total Ventas:</p>
                            { totalVentas }
                        </div>
                    </div>
                </div>
                <div className='main-menu'>
                    <table className='tabla'>
                        <thead>
                            <tr className='listado-info'>
                                <th>ID</th>
                                <th>Total</th>
                                <th>Cantidad productos</th>
                                <th>Envio</th>
                                <th>Usuario</th>
                                <th>Detalle</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ventasFiltradas}
                        </tbody>
                    </table>
                </div>
                <div className='backBtn'>
                    <Link to='/' className='back'>Vovler</Link>
                </div>
            </div>
        );
    }
}

export default Venta;