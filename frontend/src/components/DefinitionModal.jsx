import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useState} from 'react'


function DefinitionModal ({message, setMessage}) {

    return (
       
        <div>

         <Modal show={true} onHide={()=> {setMessage('')}}> 
        <Modal.Header closeButton>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {message}
        </Modal.Body>
      </Modal>

     </div>

      
    )


}

export default DefinitionModal