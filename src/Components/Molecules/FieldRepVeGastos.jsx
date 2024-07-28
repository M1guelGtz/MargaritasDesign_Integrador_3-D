import Span from "../Atoms/Span";
import Title from "../Atoms/Title";
function FieldRepVgastos({data}){
    return(
    <div className=" border-solid flex flex-col justify-between  rounded-t-2xl h-full bg-[#FFF5C3]   border w-1/4">
        <Title style='border-2 border-solid border-black rounded-t-2xl bg-[#FFF2F2]' text='Gastos recientes'></Title>
        <div className="h-full">
            <div className="overflow-hidden overflow-y-scroll h-full flex-col flex justify-evenly items-center ">
                {
                    data!=null ? data.map(item=><Span span={item}></Span>) : "datos vacios"
                }
            </div>
        </div>
    </div>
    )
}
export default FieldRepVgastos;