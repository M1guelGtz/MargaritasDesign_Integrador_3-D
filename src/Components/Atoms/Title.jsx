function Title (props) {
    return (
        <div>
            <h2 className={`${props.style} + text-2xl text-center`}>{props.text}  {props.tipo}</h2>
        </div>
    )
}
export default Title;