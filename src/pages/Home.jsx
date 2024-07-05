import { Helmet } from "react-helmet-async";
import FieldHome from "../Components/Organisms/SectionHome";
import SectionNav from "../Components/Organisms/SectionNav";
function Home (){
    return ( 
        <>
        <Helmet>
            <title>
                Margarita´s design | Home
            </title>
        </Helmet>
        <div className="w-full">
            <SectionNav></SectionNav>
            <div className="flex justify-evenly w-full  ">
                <FieldHome></FieldHome>
            </div>
        </div>
        </>
    )
}
export default Home;