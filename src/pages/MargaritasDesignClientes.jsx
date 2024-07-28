import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Title from "../Components/Atoms/Title";
import FieldgDsign from "../Components/Molecules/FieldMargaritasD";
import Foother from "../Components/Organisms/Foother";
import SectionMarg from "../Components/Organisms/SectionMargDesign";
import UserContext from "../Context/UserContext";
import CardProductosCarrito from "./CardProductosCarrito";
function MargaritasDesignCliente(){
    const value = useContext(UserContext)
    const [carrito, setCarrito] = useState(false)
    const [carrito2, setCarrito2] = useState([])
    const [bandera, setBandera] = useState(false)
    const [cliente, setCliente] = useState({})
    const [pedido, setPedido] = useState(null)
    //const [total, setTotal] = useState(0);
    let total = 0;
    let suma
    useEffect(()=>{
        fetch(`${import.meta.env.VITE_URL_BACKEND}/carritos/carrito/cliente/${value.user.id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${sessionStorage.getItem("token")}`
            }
        }).then(response => {
            if(response.ok)
                return response.json()
        }).then (datos => {
            console.log(datos[0])
            setCliente(datos[0])
            
        }).catch(
            error=>{
                console.log(error)
            }
        )
        
        fetch(`${import.meta.env.VITE_URL_BACKEND}/carrito_productos/${cliente.id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "authorization": `${sessionStorage.getItem("token")}`, 
                'Access-Control-Allow-Origin': '*'
            }
        }).then (response => {
            if(response.ok)
                return response.json()
        }).then (datos => {
            setCarrito2(datos)
            
        }).catch(
            error=>{
                console.log(error)
            }
        )
        },[bandera]
    );
    function handleClick(){
        setCarrito(!carrito)
        setBandera(!bandera)
    }
    async function handelClickCompra(){
        const { value: text } = await Swal.fire({
            width:"35%",
            "title": "Realizar pedido",
            "icon": "info",
            html:`<span> Clave interbancaria: (clave) </span><br/>
                <span> telefono: (telefono) </span><br/><br/>
                <span> su pedido sera enviado despues mandar el comprobante de pago al numero telefonico proporcionado </span>`,
            "cancelButtonText": "Cancelar",
            "showCancelButton": true,
            "confirmButtonColor":"green",
            "cancelButtonColor": "red",
            "confirmButtonText": "Confirmar",
        });
        if(text){
            Swal.fire({
                "confirmButtonColor":"green",
                "confirmButtonText": "Terminar",
                width: "35%",
                title: "Pedido realizado con exito",
                icon: "success",
                text: "SE LE RECOMIENDA REALIZAR EL PAGO EN UN PERIODO NO MAYOR A 6 DIAS PARA GARANTIZAR LA EXISTENCIA DEL PRODUCTO",
            })
            //-------------------------------Eliminar lo productos del carrito y hacer un post de pedido/------------------***//
            fetch(`${import.meta.env.VITE_URL_BACKEND}/pedidos`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `${sessionStorage.getItem("token")}`,
                    'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify({
                        "estatus_envio": 0,
                        "estatus_pago": 0,
                        "total": total, 
                        "id_admin": 3,
                        "id_cliente": cliente.id
                    })
                }
            ).then (response => {
                if(response.ok)
                    return response.json()
            }).then (datos => {
                setPedido(datos)
                console.log(datos)
                
            }).catch(
                error=>{
                    console.log(error)
                }
            )
            carrito2.map(
                item => {
                    fetch(`${import.meta.env.VITE_URL_BACKEND}/detalle_pedidos`,{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization': `${sessionStorage.getItem("token")}`,
                            'Access-Control-Allow-Origin': '*'
                            },
                            body: JSON.stringify({
                                "id_pedido": pedido.id,
                                "id_producto": item.id,
                                "cantidad": item.cantidad
                            })
                        }
                    ).then (response => {
                        if(response.ok)
                            return response.json()
                    }).then (datos => {
                        setPedido(datos)
                        
                        
                    }).catch(
                        error=>{
                            console.log(error)
                        }
                    )
                }
            )
            fetch(`${import.meta.env.VITE_URL_BACKEND}/carrito_productos/productos/carrito/${cliente.id}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `${sessionStorage.getItem("token")}`,
                    'Access-Control-Allow-Origin': '*'
                    },
                    
                }
            ).then (response => {
                if(response.ok)
                    return response.json()
            }).then (datos => {
            }).catch(
                error=>{
                    console.log(error)
                }
            )
        }

    }
    return(
        <>
            <Helmet><title>Margarita´s Design</title></Helmet>
            <div className="w-full ">
                <div className={`w-full flex justify-end h-screen bg-[#00000038] transition-transform duration-500 translate-x-0 fixed inset-0 z-10  ${carrito ?  "translate-x-0 fixed" : "translate-x-full"}`}>
                    <div className="w-1/2 h-3/4 shadow-black rounded-l-3xl bg-[#FFF9E3] ">
                        <div className="w-full border-4 border-black h-[15%] flex items-center justify-center shadow-2xl bg-[#FFDE59]"> 
                            <Title text="Tu Carrito"></Title>
                        </div>
                        <div className="overflow-hidden m-5 overflow-y-scroll h-3/4 border-4 border-black p-5">
                            {
                                carrito2 == null ? "carrito vacio" : carrito2.map(element =>  <CardProductosCarrito src={element.filename} val={bandera}   fnVal={setBandera}  style="cursor-pointer justify-evenly items-center  h-48  " id={element.id} text={ element.nombre} tipo={element.tipo} precio={ element.precio} cantidad={element.cantidad} descripcion={'Acabado ' + element.acabado} ></CardProductosCarrito>)
                            }
                            {
                                carrito2 == null ? "" : carrito2.forEach(element => {
                                    if(element.cantidad!=1){
                                        total = Number(total + (element.precio)*element.cantidad); console.log(total + " "+ element.precio)
                                    }else{
                                        total = Number(total + (element.precio));
                                    }
                                })
                            }
                        </div>
                        <div className=" bottom-1/4 flex right-[27%] border border-black p-2  bg-[#FFDE59] fixed cursor-pointer">
                            <span>Su total es de ${total}</span>
                        </div>
                        <button onClick={handelClickCompra} className="bottom-1/4 flex right-[12%] border  border-black p-2 bg-[#FFDE59] fixed cursor-pointer">Ir al pedido <img src="icons8-clasificar-derecho-24.png" alt="" /></button>
                    </div>
                </div>
                <div className=" flex w-full bg-[#FFF1F1] shadow-2xl ">
                    <img className="rounded-full w-2/12 mx-5 p-5" src="/Logo.jpg" alt="" />
                    <div className="w-8/12 text-6xl   flex flex-col justify-between items-center "> 
                        <h1 className="h-3/4 flex flex-col justify-center">Diseños Margarita</h1> 
                        <div className="flex justify-evenly bg-gradient-to-r text-xl from-yellow-300 via-amber-300 rounded-t-3xl to-yellow-300 w-1/2 h-1/4 bottom-0">
                            <a className="hover:bg-yellow-300 text-lg text-center rounded-lg h-full justify-center flex hover:border hover:border-black w-1/2" href="#productos"><button className="" >Productos</button></a>
                            <a className="hover:bg-yellow-300 text-lg text-center rounded-lg hover:border h-full justify-center flex hover:border-black w-1/2" href="#nosotros"><button  >Nosotros</button></a>
                            <a className="hover:bg-yellow-300 text-lg text-center rounded-lg hover:border h-full justify-center flex hover:border-black w-1/2" href="#contactos"><button  >Contactos</button></a>
                        </div>
                    </div>
                    <div className="w-1/3 flex   justify-center items-end  " >
                        <div className="m-5 w-full rounded-2xl h-10 items-center flex justify-evenly">
                            <Link className="hover:bg-yellow-300 text-lg text-center rounded-lg h-full justify-center flex hover:border hover:border-black w-1/2" to={'/login'}><button className="" >Cerrar Sesion</button></Link>
                            <img className={`z-10 cursor-pointer bg-white p-2 rounded-xl border border-black ml-52 transition-transform fixed duration-500  ${carrito ?  "-translate-y-36" : ""}`} onClick={handleClick} src="icons8-shopping-cart-52.png" alt="" />
                        </div>
                    </div>
                </div>
                <div className="bg-[#FFDFDF] flex-col w-full h-[300px] flex items-center justify-evenly ">
                    <h2 className="w-full text-center text-5xl">Arte en madera, pasion en cada pieza</h2>
                </div>
                <div id="productos"><SectionMarg id={cliente.id}/></div>
                <div id="nosotros" className="flex justify-center flex-col items-center  bg-[#FFDFDF]">
                    <h2 className="text-5xl m-10">Nosotros</h2>
                    <div className="w-full pb-32 pl-32 pr-32 "><FieldgDsign/></div>
                </div>
                <div id="contactos"><Foother /></div>
            </div>
            
        </>
    )
}
export default MargaritasDesignCliente;