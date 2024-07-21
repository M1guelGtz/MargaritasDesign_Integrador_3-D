import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import FieldTablaMP from "../Molecules/FieldTablaMP";
import TablaElements from "../Molecules/TablaElements";
function SecMateriaPr(props){
    const [data, setData] = useState([]);
    const [bandera, setBandera] = useState(false)
    let nombre, telefono, descripcion, direccion, correo;

    useEffect(()=>{
        fetch(`${import.meta.env.VITE_URL_BACKEND}/materia_prima`,{
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
    );
    async function modalAddProv (){
        const { value: formValues,} = await Swal.fire({
            //--------------- * Pantalla modal para editar el producto * -----------
            title: `${props.text }`,
            background: "#FDEBD0",
            showCloseButton:"close",
            html: `
                <div class="form-group">
                        <label for="swal-input6">Nombre:
                            <input type='text' required id="swal-input6" class="swal2-input">
                        </label><br/>
                        <label for="swal-input7">Cantidad:
                            <input type='number' required id="swal-input7" class="swal2-input">
                        </label><br/>
                        <label for="swal-input8">Precio actual:
                            <input type='text'   required id="swal-input8" class="swal2-input">
                        </label><br/>
                        <label for="swal-input9">Cantidad unitaria
                            <input type='email'  required id="swal-input9" class="swal2-input">
                        </label><br/>
                        <label for="swal-input10">Detalles
                            <input type='text'  required id="swal-input10" class="swal2-input">
                        </label>`,  
            showCancelButton: true,
            cancelButtonText: "<img src='icons8-cancelar-48.png'/>",
            cancelButtonColor:"transparent",
            confirmButtonText: "<img src='icons8-aceptar-48.png'/>",
            confirmButtonColor:"transparent",
            focusConfirm: false,
            preConfirm: () => {
                nombre = document.getElementById("swal-input6").value
                telefono=Number(document.getElementById("swal-input7").value)                
                direccion = document.getElementById("swal-input8").value
                correo = document.getElementById("swal-input9").value
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
            fetch(`${import.meta.env.VITE_URL_BACKEND}/materia_Prima`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `${sessionStorage.getItem("token")}`,
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    "nombre": nombre,
                    "cantidad": telefono,
                    "precio_actual": direccion,
                    "detalles": descripcion,
                    "cantidad_unitaria": correo,
                    "id_admin": 3,
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
    return(
        <div className="w-full flex  flex-col items-center m- p-8">
            <div className=" w-full justify-evenly items-center text-3xl flex p-2 border border-black border-solid  ">
                <h2 className="  w-11/12 text-center ">{props.text}</h2>
                <div className="w-1/12   justify-around">
                    <div onClick={modalAddProv} >
                        <img  className="w-1/2" src="Agregar.png" alt="" />
                    </div>
                </div>
            </div>
            <div className="w-11/12 mt-8">
                <div className="py-2 ">
                    <TablaElements uno='Id' dos='Nombre' tres='Cantidad' cuatro='Precio actual' cinco='Cantidad Unitaria'></TablaElements>
                </div>
                <div className="overflow-hidden overflow-y-scroll h-56 border-solid border-black">
                    <div >
                        {
                            data.map(element =>  <FieldTablaMP style="cursor-pointer w-full flex justify-evenly bg-gray-300" val={bandera} fnVal={setBandera} precio={element.precio_actual} id={element.id} cantidad={ element.cantidad} nombre={element.nombre} cantidad_unitaria={ element.cantidad_unitaria} descripcion={element.detalles }></FieldTablaMP>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SecMateriaPr;