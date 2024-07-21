import { Helmet } from "react-helmet-async";
import Gastos from "../Components/Organisms/SectionGastos";
import SecMateriaPr from "../Components/Organisms/SectionMateriaP";
import SectionNav from "../Components/Organisms/SectionNav";
function MateriaP () {
    return(
        <>
        <Helmet>
            <title>
                Margarita´s Design | Materia Prima
            </title>
        </Helmet>
        <div className="w-full flex flex-col items-center">
            <SectionNav></SectionNav>
            <SecMateriaPr text='Materia Prima'></SecMateriaPr>
            <Gastos></Gastos>
            
        </div>
        </>
    )
}
export default MateriaP;