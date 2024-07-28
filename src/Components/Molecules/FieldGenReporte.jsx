import { useState } from "react";
import Swal from "sweetalert2";
import Button from "../Atoms/Button";
import Title from "../Atoms/Title";
function SectionGenReporte(props){
    const [dia, setdia] = useState([])
    const [semana, setsemana] = useState([])
    const [mes, setmes] = useState([])
    const [año, setaño] = useState([])

    const [bandera, setBandera] = useState(false)
    function handleClickDia (){
        fetchPeriodo("dia")
        console.log(dia)
        Swal.fire({
            icon: "info",
            title: `${dia.ventas== 0 ? "No se han registrado ventas el dia de hoy":`Hay un total de ${dia.ventas} ventas esta semana`}`,
            html: `${dia.ventas== 0 ? "Vuelva mas tarde":`<div className='items-start justify-start flex'>Los productos vendidos fueron:<br/> ${dia.detalles.map(element=> `<span>${element!=null ? `${element.map(item=>`${item.nombre}`)}`:""}<span><br/>` )}</div><br/><span> las ganacias de la semana son $${dia.ganancias} </span> `}`,
        })
    }
    function handleClicksemana (){
        fetchPeriodo("semana")
        console.log(semana)
        console.log(semana.detalles[0])
        Swal.fire({
            title: `${semana.ventas==0 ? "No se han registrado ventas esta semana    de hoy":`Hay un total de ${semana.ventas} ventas esta semana`}`,
            html: `${semana.ventas==0 ? "Vuelva mas tarde":`<div className='items-start justify-start flex'>Los productos vendidos fueron:<br/> ${semana.detalles.map(element=> `<span>${element!=null ? `${element.map(item=>`${item.nombre}`)}`:""}<span><br/>` )}</div><br/><span> las ganacias de la semana son $${semana.ganancias} </span> `}`,
        })
    }
    function handleClickMes (){
        fetchPeriodo("mes")
        Swal.fire({
            title: `${mes.ventas==0 ? "No se han registrado ventas este mes   de hoy":`Hay un total de ${mes.ventas} ventas este mes`}`,
            html: `${mes.ventas==0 ? "Vuelva mas tarde":`<div className='items-start justify-start flex'>Los productos vendidos fueron:<br/> ${mes.detalles.map(element=> `<span>${element!=null ? `${element.map(item=>`${item.nombre}`)}`:""}<span><br/>` )}</div><br/><span> las ganacias del mes son $${semana.ganancias} </span> `}`,
        })
    }
    function handleClickAño (){
        fetchPeriodo("año")
        Swal.fire({
            title: `${año.ventas==0 ? "No se han registrado ventas este año  de hoy":`Hay un total de ${año.ventas} ventas este año`}`,
            html: `${año.ventas==0 ? "Vuelva mas tarde":`<div className='items-start justify-start flex'>Los productos vendidos fueron:<br/> ${año.detalles.map(element=> `<span>${element!=null ? `${element.map(item=>`${item.nombre}`)}`:""}<span><br/>` )}</div><br/><span> las ganacias del año son $${año.ganancias} </span> `}`,
        })
    }
    function fetchPeriodo(periodo){
        fetch(`${import.meta.env.VITE_URL_BACKEND}/ventas/reporte/ventas/${periodo}`,{
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
                switch(periodo){
                    case "dia":
                        setdia(datos)
                        break;
                    case "semana":
                        setsemana(datos)
                        break;
                    case "mes":
                        setmes(datos)
                        
                        break;
                    case "año":
                        setaño(datos)
                        
                        break;
                }
                setBandera(true)
                
            }).catch(
                error=>{
                    console.log(error)
                }
            )
        }
    return(
        <div className=" border-solid flex flex-col justify-between m-5 rounded-t-2xl h-80 bg-[#FFF5C3]   border w-3/4">
            <Title style='border-2 border-solid border-black rounded-t-2xl bg-[#FFF2F2]' text='Generar reporte de ventas'></Title>
            <div className="overflow-hidden overflow-y-scroll flex-col  h-full flex justify-evenly items-center">
                <Button onClick={handleClickDia} style="bg-white text-black font-semibold  p-3 cursor-pointer rounded text-base border-2 border-black border-solid w-1/2 hover:bg-[#ffffffae] hover:border-2 " text='Ultimo dia'></Button>
                <Button onClick={handleClicksemana} style="bg-white text-black font-semibold  p-3 cursor-pointer rounded text-base border-2 border-black border-solid w-1/2 hover:bg-[#ffffffa0] hover:border-2 " text='Ultima semana'></Button>
                <Button onClick={handleClickMes} style="bg-white text-black font-semibold  p-3 cursor-pointer rounded text-base border-2 border-black border-solid w-1/2 hover:bg-[#ffffffa0] hover:border-2 " text='Ultimo mes'></Button>
                <Button onClick={handleClickAño} style="bg-white text-black font-semibold  p-3 cursor-pointer rounded text-base border-2 border-black border-solid w-1/2 hover:bg-[#ffffffa0] hover:border-2 " text='Ultimo año'></Button>
            </div>
        </div>
    )
}
export default SectionGenReporte;