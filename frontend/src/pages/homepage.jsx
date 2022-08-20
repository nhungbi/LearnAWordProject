
import axios from 'axios'
import { useEffect } from "react"

import {useState} from 'react'
import WordSummary from "../components/WordSummary"
import Container from 'react-bootstrap/Container';


function HomePage({user} ) {
    const [history, setHistory] = useState([])

    function get_history () {
        axios.get('get_user_history').then((response) => {
            // console.log(response.data.words)
            setHistory(response.data.words) // "word, audio, definition, pronounciation, speech, stems, date_learnd
        })
    }

    useEffect( () => {
        get_history()
    }, 
    [])


    return (

        <Container fluid >
            {
                user && history ? 
                <span>
                <h1> Welcome {user.username}! </h1>
                <hr></hr>
                {
                history.map((word, index) => {
                   return <WordSummary word = {word}/> 
                }) }
                </span>
                :
                <h1> Please log in to see the words you've learned!</h1>
            }

        </Container>
    )

    
}

export default HomePage