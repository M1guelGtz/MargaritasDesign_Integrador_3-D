import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import FieldTablaGastos from "../Molecules/FieldTablaGastos";
import TablaElementsG from "../Molecules/TablaElementsG";

function Gastos(props){
    let telefono, descripcion
    const [bandera, setBandera] = useState(false );
    const [data, setData] = useState([]);
    async function modalAddProv (){
        const { value: formValues,} = await Swal.fire({
            //--------------- * Pantalla modal para editar el producto * -----------
            title: 'Agregar Gasto realizado',
            background: "#FDEBD0",
            showCloseButton:"close",
            html: `
                <div class="form-group">
                        <label for="swal-input7">Gasto total:
                            <input type='number' required id="swal-input7" class="swal2-input">
                        </label><br/>
                        <label for="swal-input10">Detalles :
                            <input type='text'  required id="swal-input10" class="swal2-input">
                        </label>`,  
            showCancelButton: true,
            cancelButtonText: "<img src='icons8-cancelar-48.png'/>",
            cancelButtonColor:"transparent",
            confirmButtonText: "<img src='icons8-aceptar-48.png'/>",
            confirmButtonColor:"transparent",
            focusConfirm: false,
            preConfirm: () => {
                telefono=Number(document.getElementById("swal-input7").value)
                descripcion = document.getElementById("swal-input10").value
            }
        })
        if(formValues){
            Swal.fire({
                background: "#FDEBD0",
                title: "!Guardado¡",
                icon: "success",
                width:"30%",
            });
            fetch(`${import.meta.env.VITE_URL_BACKEND}/gastos`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `${sessionStorage.getItem("token")}`,
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    "detalles": descripcion,
                        "total": telefono,
                        "id_admin": 3
                }),
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                setBandera(!bandera)
                
            })
            .catch(error => {
                console.error('Error al intentar guardar los cambios:', error);
            });
        }
        setBandera(!bandera)
    }
    useEffect(()=>{
        fetch(`${import.meta.env.VITE_URL_BACKEND}/gastos`,{
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
                setData(datos)
                setBandera(true)
                console.log(data)
            }).catch(
                error=>{
                    console.log(error)
                }
            )
        },[bandera]
    )

    return(
        <div className="w-full flex  flex-col items-center m- p-8">
            <div className=" w-full justify-evenly items-center text-3xl flex p-2 border border-black border-solid  ">
                <h2 className="  w-11/12 text-center ">Gastos</h2>
                <div className="w-1/12   justify-around">
                    <div onClick={modalAddProv} >
                        <img  className="w-1/2" src="Agregar.png" alt="" />
                    </div>
                </div>
            </div><div className="w-11/12 mt-8">
                <div className="py-2 ">
                    <TablaElementsG uno = 'Id ' dos='fecha' cuatro='Total'></TablaElementsG>
                </div>
                <div className="overflow-hidden overflow-y-scroll items-center h-56 border-solid border-black">
                    <div >
                        {
                            data.map(element =>  <FieldTablaGastos style="cursor-pointer w-full flex justify-evenly bg-gray-300" val={bandera} fnVal={setBandera} precio={element.total} id={element.id} cantidad={ element.cantidad} nombre={element.fecha} cantidad_unitaria={ element.cantidad_unitaria} descripcion={element.detalles }></FieldTablaGastos>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Gastos;