import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';

import Usuario from '../Usuario/usuario';
import UsuarioPerfil from '../Usuario/Perfl_Usuario/usuarioPerfil'
import Producto from '../Producto/producto';
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
          </ul>
        </nav>
      </header>

      <div>
        <Routes>
          <Route path='/usuarios' element={ <Usuario /> } />
          <Route path='/usuario/:userId' element={ <UsuarioPerfil /> } />
          <Route path='/productos' element={ <Producto /> } />
          <Route path='/' element = { <Main /> } />
        </Routes>
      </div>
    </div>
  );
}

export default App;