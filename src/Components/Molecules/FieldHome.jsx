function Details ({data, title}) {

    return (
        <>
        <div className="border w-full border-black border-solid tablet:w-5/12 laptop:w-3/12 desktop:w-3/12 flex flex-col  rounded-3xl m-5 justify-center items-center h-1/2" >
            <h3 className="  rounded-t-3xl p-2 border-b-2 border-solid border-black text-center w-full bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-yellow-200  via-orange-500 to-orange-100 ">{title}  </h3>
            <details className="justify-center flex w-4/5 m-2 translate-y-5" >
                <summary className=" hover:shadow-[0px_0px_10px_10px_#f88d0079] border  bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-yellow-200 via-orange-500 to-orange-100 border-orange-400 border-solid rounded-2xl w-1/2 text-2xl text-center "></summary>
                <div className="bg-white overflow-hidden overflow-y-scroll h-36 border-solid border-black border  w-full my-1.5" >
                    {
                        data!=null ? data.map(
                            element=> 
                                <p className="bg-blue-200 rounded-2xl m-1 text-center p">
                                    {element.nombre!=null ? 
                                    `el producto ${element.nombre} esta por agotarse, en existencia ${element.cantidad}` : element.ingresos!=null ? `los ingresos de la venta son ${element.ingresos}`: `Pedido para el cliente con id ${element.id_cliente}, con un total de $${element.total} `
                                    }
                                </p>
                        ): "datos vacios"
                    }
                </div>
            </details>
        </div>
        </>
    )
    //bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-300, bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-300
}

export default Details;