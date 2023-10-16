import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import "../Perfil_Producto/productoPerfil.css"

function PerfilProducto() {
    const { prodId } = useParams();
    const [producto, setproducto] = useState(null);

    useEffect(() => {
        fetch(`https://petlandia.onrender.com/api/busquedaProducto/${prodId}`)
            .then((response) => response.json())
            .then((data) => {
                setproducto(data.producto);
            })
    }, [prodId]);

    return (
        <div className='main'>
            <div className='main-profile'>
                <h2>Perfil de Producto</h2>
                {producto && (
                    <div className='main-info'>
                        <div className='info-box'>
                            <div className='first-info'>
                                <p>ID: {producto.ID}</p>
                                <p>Nombre: {producto.Nombre}</p>
                                <p>Percio: ${producto.Precio}</p>
                                <p>Descuento: %{producto.Descuento}</p>
                                <p>Stock: {producto.Stock}</p>
                                <p>Envio: {producto.Envio}</p>
                                <p>Animal: {producto.Animales.Nombre}</p>
                                <p>Categoria: {producto.Categorias.Nombre}</p>
                                <p>Marca: {producto.Marcas.Nombre}</p>
                                <p>Fecha Creación: {new Date(producto.Fecha_Creacion).toLocaleString()}</p>
                            </div>
                            <img src = {producto.Imagen} alt = {producto.Imagen} />
                        </div>
                    </div>
                )}

                <Link to='/productos' className='goBack'>Vovler</Link>
            </div>
        </div>
    );
}

export default PerfilProducto;