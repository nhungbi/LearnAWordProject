
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import {useState} from 'react'

function UserGuess({availableLetters,submitGuess}) {


    return (

        <div>
            <Form.Group className="mb-3" >
            <Form.Label>Guess a letter:</Form.Label>
            {
                availableLetters.map((letter)=> {
                    return <Button className = 'letters-button' onClick = {submitGuess} value = {letter}variant="outline-secondary"> {letter}</Button>
                })
            }
        </Form.Group>
            
            {/* <form onSubmit={submitGuess}>
                <label>Input Guess:</label>
                <input id = 'user-guess' maxLength = '1' type = 'text'/>
                <button type = 'submit'>Submit</button>
            </form> */}
        </div>
    )
}

export default UserGuess