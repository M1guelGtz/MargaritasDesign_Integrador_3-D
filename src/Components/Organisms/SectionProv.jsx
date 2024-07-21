import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import CardProv from "../Molecules/CardProv";

function SectionProv(props){
    const [data, setData] = useState([]);
    const [bandera, setBandera] = useState(false)
    let nombre, telefono, descripcion, direccion, correo;

    async function modalAddProv (){
        const { value: formValues,} = await Swal.fire({
            //--------------- * Pantalla modal para editar el producto * -----------
            title: `${props.text }`,
            background: "#FDEBD0",
            showCloseButton:"close",
            html: `
                <label to='swal-input1'> Nombre:
                    <input type='text' placeholder='Nombre del proveedor' required id="swal-input1" class="swal2-input">
                </label><br/>
                <label to='swal-input2'> Telefono:
                    <input type='number' placeholder='Numero telefonico' required id="swal-input2" class="swal2-input">
                </label><br/>
                <label to='swal-input3'> Direccion:
                    <input type='text'   placeholder='Direccion' required id="swal-input3" class="swal2-input">
                </label><br/>
                <label to='swal-input4'> Correo:
                    <input type='email' placeholder='Correo Electronico' required id="swal-input4" class="swal2-input">
                </label><br/>
                <label to='swal-input5'> Descripcion:
                    <input type='text' placeholder='Descripcion' required id="swal-input5" class="swal2-input">
                </label>
                `,
            showCancelButton: true,
            cancelButtonText: "<img src='icons8-cancelar-48.png'/>",
            cancelButtonColor:"transparent",
            confirmButtonText: "<img src='icons8-aceptar-48.png'/>",
            confirmButtonColor:"transparent",
            focusConfirm: false,
            preConfirm: () => {
                nombre = document.getElementById("swal-input1").value
                telefono=Number(document.getElementById("swal-input2").value)                
                direccion = document.getElementById("swal-input3").value
                correo = document.getElementById("swal-input4").value
                descripcion = document.getElementById("swal-input5").value
            }
        })
        if(formValues){
            Swal.fire({
                background: "#FDEBD0",
                title: "¡Cambios guardados correctamente!",
                icon: "success",
                width:"30%",
            });
            fetch(`${import.meta.env.VITE_URL_BACKEND}/proveedores`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `${sessionStorage.getItem("token")}`,
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    "telefono": telefono,
                    "nombre": nombre,
                    "descripcion": descripcion,
                    "direccion": direccion,
                    "correo_electronico": correo,
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
    }
    useEffect(()=>{
        fetch(`${import.meta.env.VITE_URL_BACKEND}/proveedores`,{
            method: "GET",
            headers: {
                "Authorization": `${sessionStorage.getItem("token")}`,
                'Content-Type': 'application/json',
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
    return (
        <div>
            <div className=" flex flex-wrap w-full dekstop:justify-center   ">
                <div className=" bg-gradient-to-r from-[#ffa31a]  via-[#ffa31a] to-[#ffa31a] w-full justify-evenly box-border m-8  items-center text-3xl flex p-2 border border-[#482D2E] border-solid  "><h2 className=" capitalize font-extrabold  w-11/12 text-center ">{props.text}</h2>
                    <div className="w-1/12   justify-around">
                        <div onClick={modalAddProv} to='/agregar_producto'>
                            <img  className="w-1/2" src="Agregar.png" alt="" />
                        </div>
                    </div>
                </div>
                <div className=" mx-auto laptop:w-full  grid tablet:grid-cols-2  gap-4  justify-center bg-gradient-to-b from-white  to-[#ffb84d]">
                    {
                        data.map(element =>  <CardProv style="m-5 cursor-pointer justify-evenly items-center  h-48  border border-solid  " val={bandera} fnVal={setBandera} id={element.id} telefono={ element.telefono} nombre={element.nombre} direccion={ element.direccion} descripcion={ element.descripcion} correo={element.correo_electronico} ></CardProv>)
                    }
                </div>
            </div>
        </div>
    )
    }
    export default SectionProv;