function Button (props){
    return (
        <button type="button" className="bg-white text-black font-semibold  p-3 cursor-pointer rounded text-base border-2 border-transparent border-solid hover:text-blue-400 hover:bg-blue-50" onClick={props.onClick}>{props.text}</button>
    )
}

export default Button;