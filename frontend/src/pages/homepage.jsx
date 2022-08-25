
import axios from 'axios'
import { useEffect } from "react"

import {useState} from 'react'

import Container from 'react-bootstrap/Container';



import {Link} from 'react-router-dom'
import {SpeechBubble} from 'react-kawaii'
import WordCard from '../components/WordCard';
import {Col, Row} from 'react-bootstrap'
import WelcomeType from '../components/WelcomeType';

function HomePage({user} ) {
    const [history, setHistory] = useState([])

    function getHistory () {
        axios.get('get_user_history').then((response) => {
            setHistory(response.data.words) // "word, audio, definition, pronounciation, speech, stems, date_learnd
        })
    }

    useEffect( () => {
        console.log('get history')
        getHistory()
    }, 
    [])


    return (

        <Container fluid className = 'start-below'>

            {
                user ? 
                history &&
                <Container fluid>
                    <WelcomeType user = {user} />
                <hr></hr>
                <Row>
          
                {
                    history.map((word, index) => {
                    return  <Col className = 'home-cards' sm = {6} md = {4} lg = {3}> <WordCard word = {word}/>  </Col>
                    }) }
                </Row>
           
                </Container>
                :
                <Container fluid className = 'relative-section'>
                    <SpeechBubble size={350} mood="happy" color="#C8B6FF" />
                    <h1 className='home-heading'> Please <Link to = "login">log in</Link> to see the words you've learned! </h1>
                    <h1 className='home2-heading'> <Link to = "login">Sign up</Link> if you don't have an account!</h1>
                </Container>
            }

        </Container>
    )

    
}

export default HomePage