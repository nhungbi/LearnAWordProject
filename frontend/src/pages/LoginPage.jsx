import UserForm from "../components/UserForm"

import axios from 'axios'

import { useNavigate } from "react-router-dom";

import {Container} from 'react-bootstrap'

import {Folder} from 'react-kawaii'

import {useState} from 'react'
import LoginErrorModal from "../components/LoginErrorModal";

function LoginPage({whoAmI, user}) {

    const [error, setError] = useState('')

    let navigate = useNavigate();

    const submitLoginForm = function(event){
        event.preventDefault()

        axios.post('/login', {email: event.target.email.value,
            password: event.target.password.value})
        .then((response)=>{
            console.log('response from server: ', response)
            if (response.data.success) {
            navigate('/')
            window.location.reload() } 
            else {
                setError(response.data.error)
            }
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
        
        {error && <LoginErrorModal error = {error} setError = {setError}/>}
        </div>
    )
}

export default LoginPage