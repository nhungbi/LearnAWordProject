

import Modal from 'react-bootstrap/Modal';

import WordCard from '../components/WordCard';

import {Button} from 'react-bootstrap'

function WinningModal ({puzzle}) {

    return (
    <Modal show = {true}>
        <Modal.Header>
        <Modal.Title>You won! <Button variant="light" onClick = {()=> document.location.reload()}>Restart?</Button> </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <WordCard word = {puzzle}/>
        </Modal.Body>
        
        <Modal.Footer>
        </Modal.Footer>
    </Modal>
    )
}

export default WinningModal
