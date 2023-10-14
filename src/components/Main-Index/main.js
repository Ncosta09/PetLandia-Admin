import React, { Component } from 'react';
import '../Main-Index/main.css'

class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
            usuarioTotal: "",
            usuario: "",
            productoTotal: "",
            producto: "",
            animales: ""
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
        
        //PRODUCTOS
        this.apiCall('https://petlandia.onrender.com/api/productos', this.mostrarTotalProductos)
        this.apiCall('https://petlandia.onrender.com/api/productos', this.mostrarProductos)
        
        //ANIMALES, MARCAS Y CATEGORIAS
        this.apiCall('https://petlandia.onrender.com/api/filtros', this.mostrarAnimales)
    }

    //USUARIOS
    mostrarTotalUsuario = (data) => {
        this.setState({
            usuarioTotal: data.total
        })
    }

    mostrarTotalProductos = (data) => {
        this.setState({
            productoTotal: data.total
        })
    }

    //PRODUCTOS
    mostrarUsuarios = (data) => {
        this.setState({
            usuario: data.data
        })
    }

    mostrarProductos = (data) => {
        this.setState({
            producto: data.data
        })
    }

    //ANIMALES
    mostrarAnimales = (data) => {
        this.setState({
            animales: data.animal
        })
    }

    render() {
        let infoUser;
        let infoProd;
        let usuarioConIDMasAlto = null;
        let productoConIDMasAlto = null;
    
        if (this.state.usuarioTotal === "") {
        infoUser = <p>Cargando...</p>;
        } else {
        infoUser = <p>{this.state.usuarioTotal}</p>;
        }
    
        if (this.state.productoTotal === "") {
        infoProd = <p>Cargando...</p>;
        } else {
        infoProd = <p>{this.state.productoTotal}</p>;
        }
    
        if (this.state.usuario) {
        usuarioConIDMasAlto = this.state.usuario.reduce((usuarioMasAlto, usuarioActual) => {
            return usuarioActual.id > (usuarioMasAlto ? usuarioMasAlto.id : 0) ? usuarioActual : usuarioMasAlto;
        }, null);
        }

        if (this.state.producto) {
            productoConIDMasAlto = this.state.producto.reduce((productoMasAlto, productoActual) => {
                return productoActual.id > (productoMasAlto ? productoMasAlto.id : 0) ? productoActual : productoMasAlto;
            }, null);
        }

        let listaAnimales;

        if (this.state.animales) {
            listaAnimales = this.state.animales.map((animal, index) => (
            <div key={index} className='pet-box'>
                <p> { animal.Nombre } </p>
            </div>
            ));
        }
    
        return (
        <div>
            <div className='main-mini-chart'>
            <div className='mini-chart'>
                <div className='mini-chart-info'>
                    <h3>Total Usuarios:</h3>
                    {infoUser}
                </div>
            </div>
    
            <div className='mini-chart'>
                <div className='mini-chart-info'>
                    <h3>Total Productos:</h3>
                    {infoProd}
                </div>
            </div>
            </div>
    
            <div className='main-big-chart'>
                <div className='big-chart'>
                    {usuarioConIDMasAlto && (
                        <div className='main-big-info'>
                            <h3>Ultimo usuario generado: {usuarioConIDMasAlto.id}</h3>
                            <div className='ubi-info'>
                                <div className='first-data'>
                                    <p>Nombre: {usuarioConIDMasAlto.Nombre}</p>
                                    <p>Apellido: {usuarioConIDMasAlto.Apellido}</p>
                                </div>
                                <div className='second-data'>
                                    <p>Email: {usuarioConIDMasAlto.Email}</p>
                                    <p>Telefono: {usuarioConIDMasAlto.Telefono}</p>
                                </div>
                            </div>
                            <div className='img-data'>
                                <img src={usuarioConIDMasAlto.Imagen} alt="Imagen del usuario" />
                            </div>
                        </div>
                    )}
                </div>
                <div className='big-chart'>
                    {productoConIDMasAlto && (
                        <div className='main-big-info'>
                            <h3>Ultimo producto creado: {productoConIDMasAlto.id}</h3>
                            <div className='ubi-info-producto'>
                                <div className='first-data-producto'>
                                    <p>Nombre: {productoConIDMasAlto.Nombre}</p>
                                    <p>Precio: ${productoConIDMasAlto.Precio}</p>
                                </div>
                                <div className='second-data-producto'>
                                    <p>Animal: {productoConIDMasAlto.Animales.Nombre}</p>
                                    <p>Categoria: {productoConIDMasAlto.Categorias.Nombre}</p>
                                    <p>Marca: {productoConIDMasAlto.Marcas.Nombre}</p>
                                </div>
                            </div>
                            <div className='img-data'>
                                <img src={productoConIDMasAlto.Imagen} alt="Imagen del usuario" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
    
            <div className='main-categorys-chart'>
                <div className='categorys-chart'>
                    { listaAnimales }
                </div>
                <div className='categorys-chart'></div>
                <div className='categorys-chart'></div>
            </div>
        </div>
        );
    }
}

export default Main;