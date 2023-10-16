import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../Usuario/usuario.css'

class Usuario extends Component{
    constructor(props){
        super(props);
        this.state = {
            usuarioTotal: "",
            usuarios: [],
            busqueda: ""
        }
    }

    apiCall(url, consecuencia){
        fetch(url)
        .then( response => response.json())
        .then( data => consecuencia(data))
    }

    componentDidMount(){
        //USUARIOS
        this.apiCall('https://petlandia.onrender.com/api/usuarios', this.mostrarTotalUsuario)
        this.apiCall('https://petlandia.onrender.com/api/usuarios', this.mostrarUsuarios)
    }

    //USUARIOS
    mostrarTotalUsuario = (data) => {
        this.setState({
            usuarioTotal: data.total
        })
    }

    mostrarUsuarios = (data) => {
        this.setState({
            usuarios: data.data
        })
    }

    barraBusqueda = (e) => {
        this.setState({
            busqueda: e.target.value
        });
    }

    render() {

        let totalUser;
        let { busqueda, usuarios } = this.state;

        if (this.state.usuarioTotal === "") {
            totalUser = <p>Cargando...</p>;
            } else {
            totalUser = <p>{this.state.usuarioTotal}</p>;
        }

        let usuariosFiltrados = usuarios.filter(usuario =>
            usuario.ID.toString().includes(busqueda) ||
            usuario.Nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            usuario.Apellido.toLowerCase().includes(busqueda.toLowerCase())
        );

        usuariosFiltrados = usuariosFiltrados.map(usuario => (
            <tr className='listado-info'  key={usuario.ID}>
                <td>{usuario.ID}</td>
                <td>{usuario.Nombre}</td>
                <td>{usuario.Apellido}</td>
                <td>{usuario.Email}</td>
                <td>{usuario.Telefono}</td>
                <td><Link to={`/usuario/${usuario.ID}`}>Ver</Link></td>
            </tr>
        ));
    
        return (
            <div>
                <div className='main-menu'>
                    <div className='nav-menu'>
                        <h2>Usuarios</h2>
                        <div className='usuario-id'>
                            <label>Buscar Usuario:</label>
                            <input type='text' value={busqueda} onChange={this.barraBusqueda}></input>
                        </div>
                        <div className='usuario-total'>
                            <p>Total Usuarios:</p>
                            { totalUser }
                        </div>
                    </div>
                </div>
                <div className='main-menu'>
                    <table className='tabla'>
                        <thead>
                            <tr className='listado-info'>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Email</th>
                                <th>Telefono</th>
                                <th>Vista</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuariosFiltrados}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Usuario;