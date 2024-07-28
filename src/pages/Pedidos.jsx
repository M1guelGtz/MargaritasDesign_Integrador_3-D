import { Helmet } from "react-helmet-async";
import SectionNav from "../Components/Organisms/SectionNav";
import SectionPedidos from "../Components/Organisms/SectionPedidos";
function Pedidos () {
    return(
        <>
        <Helmet>
            <title>
                Margarita´s Design | Pedidos
            </title>
        </Helmet>
        <div>
            <SectionNav></SectionNav>
            <SectionPedidos></SectionPedidos>
        </div>
        </>
    )
}
export default Pedidos;