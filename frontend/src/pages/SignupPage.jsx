import UserForm from "../components/UserForm"
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import {Mug, Folder} from 'react-kawaii'

import {Container} from 'react-bootstrap'

function SignUpPage() {
    let navigate = useNavigate();

    const handleSignUp = async (event) => {
        event.preventDefault()
        // sign user up
        const signUpResponse = await axios.post('/signup/', {
            'username': event.target.username.value,
            'email':event.target.email.value,
            'password': event.target.password.value
          })
        
        //automatically login check if sign up is successful first
        const logInResponse = await axios.post('/login', {email: event.target.email.value,
            password: event.target.password.value})

        console.log('response from server: ', logInResponse)
        navigate('/')
        window.location.reload()
        
        


    }

    
    // function handleSignUp (event) {
    //     event.preventDefault()

    //     axios.post('/signup/', {
    //         'email':event.target.email.value,
    //         'password': event.target.password.value
    //       }).then((response) => {
    //         console.log(response.data)

    //         axios.post('/login', {email: event.target.email.value,
    //             password: event.target.password.value})
    //         .then((response)=>{
    //             console.log('response from server: ', response)
    //             navigate('/')
    //             window.location.reload()
    //         })
            // navigate("/")
        //   })
    // }



    return (
        <Container fluid className ='signup-section'>
            
            <Folder className = 'folder' size={400} 
            mood="excited" color="#FFD6FF" />
            <h1 className="form-heading">Sign Up</h1>
            <UserForm className = 'user-form' handleForm = {handleSignUp} signup = {true}/>
            
        </Container>
    )
}

export default SignUpPage