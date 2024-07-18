import Nav from "../Molecules/Nav";
function SectionNav(props){
    return (
        <div className="flex w-full laptop:h-32 flex-wrap bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 box-border">
            <Nav></Nav>
        </div>
    )
}
export default SectionNav;