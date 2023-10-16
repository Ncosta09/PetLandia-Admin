import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
        <div>
            {usuario && (
                <div>
                    <h2>Perfil de Usuario</h2>
                    <p>ID: {usuario.usuario.ID}</p>
                    <p>Nombre: {usuario.usuario.Nombre}</p>
                    <p>Apellido: {usuario.usuario.Apellido}</p>
                    <p>Email: {usuario.usuario.Email}</p>
                    <p>Teléfono: {usuario.usuario.Telefono}</p>
                    <img src = {usuario.usuario.Imagen} alt = {usuario.usuario.Imagen} />
                </div>
            )}
        </div>
    );
}

export default PerfilUsuario;
