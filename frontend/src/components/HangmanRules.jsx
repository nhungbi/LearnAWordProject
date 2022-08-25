
import {Modal, Button} from 'react-bootstrap'
import {useState} from 'react'

function HangmanRules ( ) {

    const [show, setShow] = useState(false)


    return (
        <div>
            <Button className = 'rules-button' variant="light" onClick= {
                () => {setShow(true)}
            }>
                Cuppy Rules
            </Button>

       

         <Modal show={show} onHide={()=> {setShow(false)}}>
        <Modal.Header closeButton>
          <Modal.Title>Cuppy Rules</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Inspired from Hangman, players get six wrong chances to guess the word. Each wrong guess will progress to a different mug. Once a player reaches the last mug, the game is over.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=> {setShow(false)}}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

        </div>

    )


}

export default HangmanRules