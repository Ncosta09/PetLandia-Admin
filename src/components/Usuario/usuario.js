import React, { Component } from 'react';
import '../Usuario/usuario.css'

class Usuario extends Component{
    constructor(props){
        super(props);
        this.state = {
            usuarioTotal: "",
            usuario: "",
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
            usuario: data.data
        })
    }

    render() {

        let totalUser

        if (this.state.usuarioTotal === "") {
            totalUser = <p>Cargando...</p>;
            } else {
            totalUser = <p>{this.state.usuarioTotal}</p>;
        }
    
        return (
            <div>
                <div className='main-menu'>
                    <div className='nav-menu'>
                        <h2>Usuarios</h2>
                        <div className='usuario-id'>
                            <label>Buscar por ID:</label>
                            <input type='text'></input>
                        </div>
                        <div className='usuario-total'>
                            <p>Total Usuarios:</p>
                            { totalUser }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Usuario;