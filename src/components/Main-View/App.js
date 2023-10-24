import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';

import Usuario from '../Usuario/usuario';
import UsuarioPerfil from '../Usuario/Perfl_Usuario/usuarioPerfil'
import ProductoPerfil from '../Producto/Perfil_Producto/productoPerfil'
import Producto from '../Producto/producto';
import Servicio from '../Servicio/servicio';
import Venta from '../Venta/venta';
import VentaPerfil from '../Venta/Perfil_Venta/ventaPerfil';
import Main from '../Main-Index/main';

import '../Main-View/mainView.css'

function App() {
  return (
    <div className='main-div'>
      <header>
        <div className="title">
          <h1>PetLandia-Admin</h1>
        </div>

        <nav>
          <ul>
            <li><Link to='/' className='links'>Inicio</Link></li>
            <li><Link to='/usuarios' className='links'>Usuarios</Link></li>
            <li><Link to='/productos' className='links'>Productos</Link></li>
            <li><Link to='/servicios' className='links'>Servicios</Link></li>
            <li><Link to='/ventas' className='links'>Ventas</Link></li>
          </ul>
        </nav>
      </header>

      <div>
        <Routes>
          <Route path='/usuarios' element={ <Usuario /> } />
          <Route path='/usuario/:userId' element={ <UsuarioPerfil /> } />
          <Route path='/productos' element={ <Producto /> } />
          <Route path='/producto/:prodId' element={ <ProductoPerfil /> } />
          <Route path='/servicios' element={ <Servicio /> } />
          <Route path='/ventas' element={ <Venta /> } />
          <Route path='/venta/:ventaId' element={ <VentaPerfil /> } />
          <Route path='/' element = { <Main /> } />
        </Routes>
      </div>
    </div>
  );
}

export default App;