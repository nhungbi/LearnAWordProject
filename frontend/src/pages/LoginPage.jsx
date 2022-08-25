import UserForm from "../components/UserForm"

import axios from 'axios'

import { useNavigate } from "react-router-dom";

import {Container} from 'react-bootstrap'

import {Folder} from 'react-kawaii'
function LoginPage({whoAmI, user}) {

    let navigate = useNavigate();

    const submitLoginForm = function(event){
        event.preventDefault()

        axios.post('/login', {email: event.target.email.value,
            password: event.target.password.value})
        .then((response)=>{
            console.log('response from server: ', response)
            navigate('/')
            window.location.reload()
        })
      }

    return (
        
        <div>
        {user ? 
        <h1> Hello {user.username}! You're already logged in.</h1> 
        :
        <Container fluid className ='relative-section'>   
        <Folder size={400} 
            mood="blissful" color="#E7C6FF" />
        <h1 className="form-heading">Login</h1>
        <UserForm  className = 'user-form' handleForm={submitLoginForm} signup = {false}/>
        </Container>}
        </div>
    )
}

export default LoginPage