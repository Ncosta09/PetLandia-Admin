import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import "../Perfl_Usuario/usuarioPerfil.css"

function PerfilUsuario() {
    const { userId } = useParams();
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        fetch(`https://petlandia.onrender.com/api/busquedaUsuario/${userId}`)
            .then((response) => response.json())
            .then((data) => {
                setUsuario(data);
            })
    }, [userId]);

    return (
        <div className='main'>
            <div className='main-profile'>
                <h2>Perfil de Usuario</h2>
                {usuario && (
                    <div className='main-info'>
                        <div className='info-box'>
                            <div className='first-info'>
                                <p>ID: {usuario.usuario.ID}</p>
                                <p>Nombre: {usuario.usuario.Nombre}</p>
                                <p>Apellido: {usuario.usuario.Apellido}</p>
                                <p>Email: {usuario.usuario.Email}</p>
                                <p>Teléfono: {usuario.usuario.Telefono}</p>
                                <p>Fecha Creación: {new Date(usuario.usuario.Fecha_Creacion).toLocaleString()}</p>
                            </div>
                            <img src = {usuario.usuario.Imagen} alt = {usuario.usuario.Imagen} />
                        </div>
                    </div>
                )}

                <Link to='/usuarios' className='goBack'>Vovler</Link>
            </div>
        </div>
    );
}

export default PerfilUsuario;
