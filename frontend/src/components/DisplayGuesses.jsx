
import { ListGroupItem } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';


function DisplayGuesses (props) {

    const {wrongGuesses} = props //this prop is a list of letters that are not in puzzle

    return (
        <div>
            { wrongGuesses.length != 0 &&
            <div>
            <ListGroup horizontal>
            <ListGroupItem className = 'wrong-guesses'> Wrong Guesses: </ListGroupItem>
            {
            wrongGuesses.map((letter, index) => {
                return  <ListGroup.Item className = 'wrong-guesses'> {index+1}. {letter}</ListGroup.Item>
            })
            }
            </ListGroup>

            </div> }
        </div>
    )
}

export default DisplayGuesses