import { useState } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserContext from './Context/UserContext'
import './index.css'
import AddProducto from './pages/AddProducto'
import Clientes from './pages/Clientes'
import Home from './pages/Home'
import Login from './pages/Login'
import MargaritasDesign from './pages/MargaritasDesign'
import MargaritasDesignCliente from './pages/MargaritasDesignClientes'
import MateriaP from './pages/MateriaPrima'
import Pedidos from './pages/Pedidos'
import Productos from './pages/Productos'
import Proveedores from './pages/Proveedores'
import Registro from './pages/Registro'
import RouteProtectedAdmin from './pages/RouteProtectedAdmin'
import RouteProtectedUser from './pages/RouteProtectedUser'
import Ventas from './pages/Ventas'

function App (){
  const [user, setUser] = useState({});
  return(
    <HelmetProvider>
      <BrowserRouter>
        <UserContext.Provider value={{user, setUser}}>
          <Routes>
            <Route path='/' element={<MargaritasDesign />}/>
            <Route path='/login' element={<Login />} />
            <Route path='/registro' element={<Registro />} />
            <Route element={<RouteProtectedAdmin />} >
              <Route path='/home' element={<Home />} />
              <Route path='/agregar_producto' element={<AddProducto />} />
              <Route path='/clientes' element={<Clientes />} />
              <Route path='/materia-prima' element={<MateriaP />} />
              <Route path='/pedidos' element={<Pedidos />} />
              <Route path='/productos' element={<Productos />} />
              <Route path='/proveedores' element={<Proveedores />} />
              <Route path='/ventas' element={<Ventas />} />

            </Route>
            <Route  element={<RouteProtectedUser />} >
              <Route path='/cliente' element={<MargaritasDesignCliente />} />
            </Route>
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </HelmetProvider>
  )
}
export default App;