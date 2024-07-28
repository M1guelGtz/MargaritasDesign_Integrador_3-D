function Label (props) {
    return (
        <div className={`${props.style}`}>
            <label className="">{props.text}</label>
        </div>
    )
}
export default Label;