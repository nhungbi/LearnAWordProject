import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function UserForm ({handleForm, signup}) {



    return (
        <Form className = 'user-form' onSubmit={handleForm}>
            {signup &&
            <Form.Group className="mb-3">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" placeholder="Enter username" name = "username"/>
            </Form.Group>}

            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address:</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name = "email"/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" placeholder="Password" name = "password"/>
            </Form.Group>
            <Button variant="primary" type="submit">
                {signup ? 'sign up' : 'login'}
            </Button>

        </Form>
        
    )
}

export default UserForm