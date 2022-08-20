
import Form from 'react-bootstrap/Form';
import {useState} from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import { useEffect } from 'react';
function HandleDefinition ({wordObject, speech, definition}) {


    const [message, setMessage] = useState('You must type the definition correctly in order to save the word in your account!')

    const [userDef, setUserDef] = useState('')

    const [displayDef, setDisplayDef] = useState('')

    const [canSave, setCanSave] = useState(true)



    function save (event) {
        event.preventDefault()

        if (userDef && canSave) {

        axios.post('save_word', wordObject).then((response) => {

            console.log(response)
            
        })} else(
        alert('You must type the definition correctly in order to save the word in your account!'))
    }

    function checkDef (event) {
        setUserDef(event.target.value)
    }

    useEffect(()=> {
        // console.log(userDef, '-----userdef')
        setCanSave(true) // reset 

        setDisplayDef(
            definition.split('').map((char, index) => {

                if (userDef.length > index && definition[index] == userDef[index]) {
                    return <span key= {index} className = 'correct-char'>{char}</span>
                } 
                else {
                    setCanSave(false)
                    return <span key= {index} className = 'wrong-char'> {char} </span> }

            })
        )
        
      
    }, [userDef])

    function preventPasting (event) {
        event.preventDefault()
        alert('Hey! No Cheating!')
        
    }



    return (
        <div>
            <h5> Part of speech: <span className="lighter"> {speech} </span></h5>
            <h5> Definition: <span className="lighter"> {definition} </span> </h5>
            <Form onSubmit= {save}>
                <Form.Label htmlFor="inputPassword5">Retype the definition:</Form.Label>
                <Form.Control
                    type="text"
                    onChange = {checkDef}
                    onPaste= {preventPasting}
                />
                <Form.Text muted>
                    {message}
                    <p> {displayDef} </p>
                </Form.Text>
                <br></br>

                <Button type = 'submit' variant="outline-secondary"> save word</Button>
            </Form>
        </div>
    )
}

export default HandleDefinition