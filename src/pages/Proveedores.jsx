import { Helmet } from "react-helmet-async";
import SectionNav from "../Components/Organisms/SectionNav";
import SectionProv from "../Components/Organisms/SectionProv";
function Proveedores () {
    return(
        <>
        <Helmet>
            <title>
                Margarita´s Design | Proveedores
            </title>
        </Helmet>
        <div>
            <SectionNav></SectionNav>
            <SectionProv text='proveedores'></SectionProv>
        </div>
        </>
    )
}
export default Proveedores;