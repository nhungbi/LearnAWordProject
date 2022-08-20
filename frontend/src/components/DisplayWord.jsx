

function DisplayWord ({word, stems}) {

    console.log(stems, 'stemmms')
    return (
        <div className="word-section">
            <h1 className = 'word'>{word}</h1>
            <hr></hr>
            <h4>Other forms: {stems.map((stem, index)=> {
                if (index === stems.length -1 ) {
                    return <span className="lighter">{stem}</span>
                }
                return <span className="lighter">{stem}, </span>})}
            </h4>
        </div>
    )
}

export default DisplayWord