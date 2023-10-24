import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../Servicio/servicio.css';

class Servicio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            servicios: [],
            busqueda: "",
            filaSeleccionada: {}
        };
    }

    apiCall(url, consecuencia) {
        fetch(url)
            .then(response => response.json())
            .then(data => consecuencia(data));
    }

    componentDidMount() {
        // SERVICIOS
        this.apiCall('https://petlandia.onrender.com/api/servicios', this.mostrarServicios);
    }

    // SERVICIOS
    mostrarServicios = (data) => {
        this.setState({
            servicios: data.data
        });
    }

    barraBusqueda = (e) => {
        this.setState({
            busqueda: e.target.value
        });
    }

    handleCheckboxChange = (servicio) => {
        this.setState((prevState) => ({
            filaSeleccionada: {
                ...prevState.filaSeleccionada,
                [servicio.ID]: !prevState.filaSeleccionada[servicio.ID]
            }
        }));
    }

    render() {
        let { busqueda, servicios, filaSeleccionada } = this.state;

        let serviciosFiltrados = servicios.filter(servicio =>
            servicio.ID.toString().includes(busqueda)
        );

        serviciosFiltrados = serviciosFiltrados.map(servicio => (
            <tr className={`listado-info ${filaSeleccionada[servicio.ID] ? 'fila-seleccionada' : ''}`} key={servicio.ID}>
                <td>{servicio.ID}</td>
                <td>{servicio.Tipo_Servicio}</td>
                <td>{servicio.Fecha_Turno}</td>
                <td>{servicio.Mensaje}</td>
                <td>{servicio.Usuarios.Nombre}{" "}{servicio.Usuarios.Apellido}</td>
                <td>
                    <input
                        type="checkbox" checked={filaSeleccionada[servicio.ID] || false }
                        onChange={() => this.handleCheckboxChange(servicio)}
                    />
                </td>
            </tr>
        ));

        return (
            <div>
                <div className='main-menu'>
                    <div className='nav-menu'>
                        <h2>Servicios</h2>
                        <div className='servicio-id'>
                            <label>Buscar Servicio:</label>
                            <input type='text' value={busqueda} onChange={this.barraBusqueda} />
                        </div>
                    </div>
                </div>
                <div className='main-menu'>
                    <table className='tabla'>
                        <thead>
                            <tr className='listado-info'>
                                <th>ID</th>
                                <th>Tipo de servicio</th>
                                <th>Fecha del turno</th>
                                <th>Mensaje</th>
                                <th>Usuario</th>
                                <th>Realizado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {serviciosFiltrados}
                        </tbody>
                    </table>
                </div>
                <div className='backBtn'>
                    <Link to='/' className='back'>Volver</Link>
                </div>
            </div>
        );
    }
}

export default Servicio;
