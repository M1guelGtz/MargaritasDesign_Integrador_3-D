import Details from "../Molecules/FieldHome";

function FieldHome () {
    return(
        //bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-300 
        <div className="flex w-full  h-2/3 flex-wrap justify-evenly">
            <h2 className="w-full justify-center m-8 items-center text-3xl flex p-2 border bg-gradient-to-r from-blue-400 via-blue-100 to-blue-300 border-black border-solid">Notificaciones</h2>
            <Details title='Materia prima'></Details>
            <Details title='Stock'></Details>
            <Details title='Ventas del dia'></Details>
            <Details title='Pagos del dia'></Details>
            <Details title='Pedidos'></Details>
        </div>
    )
}
export default FieldHome;