import { Helmet } from "react-helmet-async";
import SectionNav from "../Components/Organisms/SectionNav";
import SectionReporteVentas from "../Components/Organisms/SectionReporteVentas";
import SectionVentas from "../Components/Organisms/SectionVentas";
function Ventas () {
    return(
        <>
        <Helmet>
            <title>
                Margarita´s Design | Ventas
            </title>
        </Helmet>
        <div className="w-full flex flex-col items-center">
            <SectionNav></SectionNav>
            <SectionVentas></SectionVentas>
            <SectionReporteVentas></SectionReporteVentas>
        </div>
        
        </>
    )
}
export default Ventas;