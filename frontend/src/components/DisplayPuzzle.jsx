
import {Button} from 'react-bootstrap'

function DisplayPuzzle (props) {

    return (
        <div>
            <h1> 
            { 
            props.puzzle.word.split('').map((letter) => { 
                if (props.lettersGuessed.includes(letter)) {
                    return <Button className = 'letters-button' variant="outline-secondary"> {letter} </Button>
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