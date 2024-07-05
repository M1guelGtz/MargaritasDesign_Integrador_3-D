function Details (props) {
    return (
        <>
        <div className="border border-black border-solid w-1/3 flex flex-col bg-yellow-100 rounded-3xl m-5 justify-center items-center h-1/2" >
        <h3 className="bg-pink-200 rounded-t-3xl p-2 border-b-2 border-solid border-black text-center w-full">{props.title}</h3>
        <details className="justify-center flex w-4/5 m-2 translate-y-5" >
                <summary className="border border-black border-solid bg-pink-200 rounded-2xl w-full text-2xl text-center "></summary>
                <div className="bg-white border-solid border-black border rounded-2xl w-full my-1.5" >
                    <p className="text-justify p-5"> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt alias nisi voluptatum fugiat porro, explicabo veritatis quisquam necessitatibus quod excepturi nesciunt blanditiis fugit rerum iusto exercitationem quam optio aspernatur ipsa. </p>
                </div>
            </details>
        </div>
        </>
    )
}

export default Details;