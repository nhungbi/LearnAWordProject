import axios from 'axios'
import { useEffect } from 'react'
import {useState} from 'react'
import DisplayWord from '../components/DisplayWord'
import HandleDefinition from '../components/HandleDefinition'
import WordAudio from '../components/WordAudio'

import Container from 'react-bootstrap/Container';


function WordPage () {

    const [word, setWord] = useState(null)

    function get_word () {

        axios.get('get_word').then((response) => {
            console.log(response.data)
            setWord(response.data) //an object with word, audio, definition, pronounciation, speech, and stems as keys

        })
    }

    useEffect(()=> {
        get_word()
    }, [])


    return (
        <Container fluid>
            {word ? 
            <div>
                <DisplayWord word = {word.word} stems = {word.stems}/>
                <WordAudio audio = {word.audio} pronounciation = {word.pronounciation} />
                <HandleDefinition wordObject = {word} speech = {word.speech} definition={word.definition}/> 
             </div> 
            
            : <h1>Loading....</h1>}

            

        </Container>
    )
}
export default WordPage