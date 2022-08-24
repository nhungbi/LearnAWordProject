


function DisplayPuzzle (props) {

    return (
        <div>
            <h1> 
            { 
            props.puzzle.word.split('').map((letter) => { 
                if (props.lettersGuessed.includes(letter)) {
                    return letter
                } else {
                    return ' _ '
                }
            })
            }
            </h1>
        </div>
    )
}


export default DisplayPuzzle