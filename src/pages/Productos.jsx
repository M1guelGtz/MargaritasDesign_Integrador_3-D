import { Helmet } from "react-helmet-async";
import SectionNav from "../Components/Organisms/SectionNav";
import SectionProd from "../Components/Organisms/SectionProd";
function Productos () {
    return(
        <>
        <Helmet>
            <title>
                Margarita´s Design | Productos
            </title>
        </Helmet>
        <div>
            <SectionNav></SectionNav>
            <SectionProd></SectionProd>
        </div>
        </>
    )
}
export default Productos;