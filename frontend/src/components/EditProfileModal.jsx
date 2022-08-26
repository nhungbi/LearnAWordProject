
import {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form} from 'react-bootstrap'

import axios from 'axios'
import { useNavigate } from "react-router-dom";


function EditProfileModal ({user, setError}) {
    let navigate = useNavigate()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function EditProfile (event) {
        event.preventDefault()

        let password = event.target.password.value
        if (password != '' && password.length < 8) {
            setError('Password must be at least 8 characters long!')
            return
        }

        axios.put('edit_profile', {email: event.target.email.value, username: event.target.username.value, password: event.target.password.value }).then((response) => {
            if (!response.data.success) {
                setError(response.data.data)
            } else {
                navigate('../login')
                document.location.reload()
            }
    })}

    return (
        <div>
            <Button className = 'profile-button' size="lg" onClick={handleShow}>
             Edit Profile
            </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Form onSubmit = {EditProfile}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder={user.email} name = 'email'/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder={user.username} name = 'username'/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Change password" name = 'password'/>
            </Form.Group>

            <Button variant="primary" type="submit">
                Save
            </Button>
        </Form>
        

        </Modal.Body>
        <Modal.Footer>
        <p> Leave blank if you don't want to change.</p>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          

        </Modal.Footer>

      </Modal>

        </div>
    )
}

export default EditProfileModal