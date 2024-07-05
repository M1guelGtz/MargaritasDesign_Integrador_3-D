import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import AddProducto from './pages/AddProducto'
import Clientes from './pages/Clientes'
import EliminarProd from './pages/EliminarProducto'
import Home from './pages/Home'
import Login from './pages/Login'
import MateriaP from './pages/MateriaPrima'
import Pedidos from './pages/Pedidos'
import Productos from './pages/Productos'
import Proveedores from './pages/Proveedores'
import Ventas from './pages/Ventas'
const router = createBrowserRouter([
  {
    path:"/",
    element: <Login/>
  },{
    path: "/home",
    element: <Home></Home>
  },{
    path: "/productos",
    element: <Productos/>
  },
  {
    path: "/clientes",
    element: <Clientes></Clientes>
  },
  {
    path: "/materia-prima",
    element: <MateriaP></MateriaP>
  },
  {
    path: "/pedidos",
    element: <Pedidos></Pedidos>
  },
  {
    path: "/proveedores",
    element: <Proveedores></Proveedores>
  },{
    path: "/ventas",
    element: <Ventas></Ventas>
  },{
    path:'/agregar_producto',
    element: <AddProducto></AddProducto>
  },{
    path:'/eliminar_producto',
    element: <EliminarProd></EliminarProd>
  },{
    path: "agregar_clientes",
    element: <AddProducto></AddProducto>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router}>
      </RouterProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
