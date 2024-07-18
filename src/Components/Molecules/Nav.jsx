import Href from "../Atoms/HRef";
function Nav (props){
    
    return(
        <div className="flex-wrap flex w-full justify-evenly shadow-[0px_0px_5px_5px_#482D2E] ">
            <Href imagen='Home.png' text='Inicio' ruta='/home'></Href>
            <Href imagen='/Productos.png ' ruta='/productos' text='Productos'></Href>
            <Href imagen='/Clientes.png' ruta='/clientes' text='Clientes'></Href>
            <Href imagen='/Proveedores.png' ruta='/proveedores' text='proveedores'></Href>
            <Href imagen='/Materia P.png' ruta='/materia-prima' text='Materia Prima'></Href>
            <Href imagen='/Ventas.png' ruta='/ventas' text='Ventas'></Href>
            <Href imagen='/Pedidos.png' ruta='/pedidos' text='Pedidos'></Href>
            <Href imagen='Usario.png' text='Cerrar Sesion'></Href>
        </div>
    )
}
export default Nav;