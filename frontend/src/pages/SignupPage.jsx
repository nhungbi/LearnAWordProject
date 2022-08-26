import UserForm from "../components/UserForm"
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import {Mug, Folder} from 'react-kawaii'
import {useState} from 'react'
import {Container} from 'react-bootstrap'
import ErrorModal from "../components/ErrorModal";

function SignUpPage() {
    let navigate = useNavigate();

    const [error, setError] = useState('')

    const handleSignUp = async (event) => {
        event.preventDefault()
        let password = event.target.password.value
        if (password.length < 8) {
            setError('Password must be at least 8 characters long!')
            return
        }
        // sign user up
        const signUpResponse = await axios.post('/signup/', {
            'username': event.target.username.value,
            'email':event.target.email.value,
            'password': password
          })
        
        //automatically login check if sign up is successful first
    
        if (signUpResponse.data.success){
            const logInResponse = await axios.post('/login', {email: event.target.email.value,
                password: event.target.password.value})

            console.log('response from server: ', logInResponse)
            navigate('/')
            window.location.reload()}
        else {

            console.log(signUpResponse.data.data)
            setError(signUpResponse.data.data)
        }
        
        


    }

    return (
        <Container fluid className ='relative-section'>
            
            <Folder size={420} 
            mood="excited" color="#FFD6FF" />
            <h1 className="form-heading">Sign Up</h1>
            <UserForm className = 'user-form' handleForm = {handleSignUp} signup = {true}/>

        {error && <ErrorModal error = {error} setError = {setError}/>}
        
        </Container>
    )
}

export default SignUpPage