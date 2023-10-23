import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../Producto/producto.css'

class Producto extends Component{
    constructor(props){
        super(props);
        this.state = {
            productoTotal: "",
            productos: [],
            busqueda: ""
        }
    }

    apiCall(url, consecuencia){
        fetch(url)
        .then( response => response.json())
        .then( data => consecuencia(data))
    }

    componentDidMount(){
        //PRODUCTOS
        this.apiCall('https://petlandia.onrender.com/api/productos', this.mostrarTotalProductos)
        this.apiCall('https://petlandia.onrender.com/api/productos', this.mostrarProductos)
    }

    //PRODUCTOS
    mostrarTotalProductos = (data) => {
        this.setState({
            productoTotal: data.total
        })
    }

    mostrarProductos = (data) => {
        this.setState({
            productos: data.data
        })
    }

    barraBusqueda = (e) => {
        this.setState({
            busqueda: e.target.value
        });
    }

    render() {

        let totalProd;
        let { busqueda, productos } = this.state;

        if (this.state.productoTotal === "") {
            totalProd = <p>Cargando...</p>;
            } else {
            totalProd = <p>{this.state.productoTotal}</p>;
        }

        let productosFiltrados = productos.filter(producto =>
            producto.ID.toString().includes(busqueda) ||
            producto.Nombre.toLowerCase().includes(busqueda.toLowerCase())
        );

        productosFiltrados = productosFiltrados.map(producto => (
            

            <tr className='listado-info'  key={producto.ID}>
                <td>{producto.ID}</td>
                <td>{producto.Nombre}</td>
                <td>{producto.Precio}</td>
                <td>{producto.Descuento}</td>
                <td>{producto.Stock}</td>
                <td>{producto.Envio}</td>
                <td><Link to={`/producto/${producto.ID}`}>Ver</Link></td>
            </tr>
        ));
    
        return (
            <div>
                <div className='main-menu'>
                    <div className='nav-menu'>
                        <h2>Productos</h2>
                        <div className='producto-id'>
                            <label>Buscar Producto:</label>
                            <input type='text' value={busqueda} onChange={this.barraBusqueda}></input>
                        </div>
                        <div className='producto-total'>
                            <p>Total Productos:</p>
                            { totalProd }
                        </div>
                    </div>
                </div>
                <div className='main-menu'>
                    <table className='tabla'>
                        <thead>
                            <tr className='listado-info'>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Descuento</th>
                                <th>Stock</th>
                                <th>Envio</th>
                                <th>Vista</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productosFiltrados}
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

export default Producto;