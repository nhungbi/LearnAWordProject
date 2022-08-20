

function WordAudio ({audio, pronounciation}) {

    return (
        <div className="audio">
            <h5 >Pronounciation: <span className="lighter"> {pronounciation}</span></h5>

        <audio controls src={audio}>
        </audio>
        </div>

    )

}

export default WordAudio