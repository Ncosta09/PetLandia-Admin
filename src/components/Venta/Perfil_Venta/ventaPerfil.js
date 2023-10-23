import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import "../Perfil_Venta/ventaPerfil.css"

function PerfilVenta() {
    const { ventaId } = useParams();
    const [venta, setVenta] = useState(null);

    useEffect(() => {
        fetch(`https://petlandia.onrender.com/api/busquedaVentas/${ventaId}`)
            .then((response) => response.json())
            .then((data) => {
                setVenta(data);
            });
    }, [ventaId]);

    const datosVenta = () => {
        if (venta && venta.data) {
            const datosVenta = venta.data;

            return (
                <div className='main-table'>
                    <table className="tabla">
                    <thead>
                        <tr className='listado-info'>
                            <th>ID de Venta</th>
                            <th>Usuario</th>
                            <th>Total de la Venta</th>
                            <th>Costo de Envío</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>    
                    <tbody>
                        <tr className='listado-info'>
                            <td>{datosVenta.ID}</td>
                            <td>{datosVenta.Usuarios.Nombre} {datosVenta.Usuarios.Apellido}</td>
                            <td>${datosVenta.Precio_Total}</td>
                            <td>${datosVenta.Costo_Envio}</td>
                            <td>{new Date(datosVenta.Fecha).toLocaleDateString()}</td>
                        </tr>
                    </tbody>
                </table>
                </div>
            );
        }
    };

    const detalleVenta = () => {
        if (venta && venta.data && venta.data.DetalleVentas && venta.data.DetalleVentas.length > 0) {
            return (
                <div className='main-table'>
                    <table className="tabla">
                    <thead>
                        <tr className='listado-info'>
                            <th>ID</th>
                            <th>Precio Unidad</th>
                            <th>Cantidad</th>
                            <th>Descuento</th>
                            <th>Envío</th>
                            <th>Producto</th>

                        </tr>
                    </thead>
                    <tbody>
                        {venta.data.DetalleVentas.map((detalle, index) => (
                            <tr key={index} className='listado-info'>
                                <td>{detalle.ID}</td>
                                <td>${detalle.Precio_Unidad}</td>
                                <td>{detalle.Cantidad}</td>
                                <td>{detalle.Descuento}%</td>
                                <td>${detalle.Envio}</td>
                                <td><Link to={`/producto/${detalle.ID}`}>Ver producto</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            );
        }
    };

    return (
        <div>
            <div className='top-bar'>
                <h2>Detalle de la venta</h2>
            </div>
            {datosVenta()}
            {detalleVenta()}

            <div className='backBtn'>
                <Link to='/ventas' className='back'>Vovler</Link>
            </div>
        </div>
    );
}

export default PerfilVenta;