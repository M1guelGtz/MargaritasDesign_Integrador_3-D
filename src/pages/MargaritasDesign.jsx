import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import FieldgDsign from "../Components/Molecules/FieldMargaritasD";
import Foother from "../Components/Organisms/Foother";
import SectionMarg from "../Components/Organisms/SectionMargDesign";

function MargaritasDesign(){
    return(
        <>
            <Helmet><title>Margarita´s Design</title></Helmet>
            <div className="w-full ">
                <div className=" flex w-full shadow-2xl  bg-gradient-to-r  from-amber-50 via-[#FFF1F1] to-amber-50  ">
                    <img className="rounded-full w-2/12 mx-5 p-5" src="/Logo.jpg" alt="" />
                    <div className="w-8/12 text-6xl   flex flex-col justify-between items-center "> 
                        <h1 className="h-3/4 flex flex-col justify-center">Diseños Margarita</h1> 
                        <div className="flex z-10 justify-evenly bg-gradient-to-r text-xl from-yellow-300 via-amber-300 rounded-t-3xl to-yellow-300 w-1/2 h-1/4 bottom-0">
                            <a className="hover:bg-yellow-300 text-lg text-center rounded-lg h-full justify-center flex hover:border hover:border-black w-1/2" href="#productos"><button className="" >Productos</button></a>
                            <a className="hover:bg-yellow-300 text-lg text-center rounded-lg hover:border h-full justify-center flex hover:border-black w-1/2" href="#nosotros"><button  >Nosotros</button></a>
                            <a className="hover:bg-yellow-300 text-lg text-center rounded-lg hover:border h-full justify-center flex hover:border-black w-1/2" href="#contactos"><button  >Contactos</button></a>
                        </div>
                    </div>
                    <div className="w-1/3 flex   justify-center items-end  " >
                        <div className="m-1 w-full rounded-2xl h-10 items-center flex justify-evenly">
                            <Link className="hover:bg-yellow-300 text-lg text-center rounded-lg h-full justify-center flex hover:border hover:border-black w-1/2" to={'/login'}><button className="" >Inicia sesion</button></Link>
                            <Link className="hover:bg-yellow-300 text-lg text-center rounded-lg hover:border h-full justify-center flex hover:border-black w-1/2" to={'/registro'}><button  >Registrate</button></Link>
                        </div>
                    </div>
                </div>
                <div className="bg-[#FFDFDF] flex-col w-full h-56 flex items-center justify-evenly ">
                    <h2 className="w-full text-center text-5xl">Arte en madera, pasion en cada pieza</h2>
                </div>
                <div id="productos"><SectionMarg /></div>
                <div id="nosotros" className="flex justify-center flex-col items-center  bg-[#FFDFDF]">
                    <h2 className="text-5xl m-10">Nosotros</h2>
                    <div className="w-full pb-32 pl-32 pr-32 "><FieldgDsign/></div>
                </div>
                <div id="contactos"><Foother /></div>
            </div>
        </>
    )
}
export default MargaritasDesign;