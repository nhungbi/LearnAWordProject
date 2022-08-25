import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useState} from 'react'

function HintModal({word}) {
    const [show, setShow] = useState(false);


    return (
       
        <div>
            <Button className = 'hint-button' variant="light" onClick= {
                () => {setShow(true)}
            }>
                Hint
            </Button>

       

         <Modal show={show} onHide={()=> {setShow(false)}}>
        <Modal.Header closeButton>
          <Modal.Title>Definition</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {word.definition}
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

export default HintModal