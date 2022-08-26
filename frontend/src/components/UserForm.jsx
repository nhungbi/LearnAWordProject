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
            {
                signup && <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            }
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" placeholder="Enter password" name = "password"/>
                {
                signup && <Form.Text className="text-muted">
                Your password must be at least 8 characters long.
                </Form.Text>
            }
            </Form.Group>
            <Button variant="outline-secondary" type="submit">
                {signup ? 'sign up' : 'login'}
            </Button>

        </Form>
        
    )
}

export default UserForm