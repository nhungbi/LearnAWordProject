import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useState} from 'react'


function ErrorModal ({error, setError}) {
    const [show, setShow] = useState(true);


    return (
       
        <div>

         <Modal show={show} onHide={()=> {setError('')}}> 
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {error}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=> {document.location.reload()}}>
            Retry
          </Button>
        </Modal.Footer>
      </Modal>

     </div>

      
    )


}

export default ErrorModal