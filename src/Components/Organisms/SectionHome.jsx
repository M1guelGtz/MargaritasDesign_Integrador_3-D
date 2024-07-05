import Details from "../Molecules/FieldHome";

function FieldHome () {
    return(
        <div className="flex w-full h-2/3 flex-wrap justify-evenly">
            <h2 className="w-full justify-center m-8 items-center text-3xl flex p-2 border border-black border-solid">Notificaciones</h2>
            <Details title='Materia prima'></Details>
            <Details title='Stock'></Details>
            <Details title='Ventas del dia'></Details>
            <Details title='Pagos del dia'></Details>
            <Details title='Pedidos'></Details>
        </div>
    )
}
export default FieldHome;