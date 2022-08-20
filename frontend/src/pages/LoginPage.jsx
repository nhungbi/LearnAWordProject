import UserForm from "../components/UserForm"

import axios from 'axios'

import { useNavigate } from "react-router-dom";

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
        <div>
            <h1>Login</h1>
            <UserForm handleForm={submitLoginForm} signup = {false}/>
        </div>}
        </div>
    )
}

export default LoginPage