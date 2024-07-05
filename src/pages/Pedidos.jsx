import { Helmet } from "react-helmet-async";
import SectionNav from "../Components/Organisms/SectionNav";
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
        </div>
        </>
    )
}
export default Pedidos;