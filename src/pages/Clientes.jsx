import { Helmet } from "react-helmet-async";
import SectionClientes from "../Components/Organisms/SectionClientes";
import SectionNav from "../Components/Organisms/SectionNav";
function Clientes () {
    return(
        <>
        <Helmet>
            <title>
                Margarita´s Design | Clientes
            </title>
        </Helmet>
        <div>
            <SectionNav></SectionNav>
            <SectionClientes text='Clientes'></SectionClientes>
        </div>
        </>
    )
}
export default Clientes;