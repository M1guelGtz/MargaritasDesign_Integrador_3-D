import { Helmet } from "react-helmet-async";
import SectionClientes from "../Components/Organisms/SectionClientes";
import SectionNav from "../Components/Organisms/SectionNav";
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
            <SectionClientes text='Proveedores'></SectionClientes>
        </div>
        </>
    )
}
export default Proveedores;