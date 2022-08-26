import axios from 'axios'
import { useEffect } from 'react'
import {useState} from 'react'
import DisplayWord from '../components/DisplayWord'
import HandleDefinition from '../components/HandleDefinition'
import WordAudio from '../components/WordAudio'

import Container from 'react-bootstrap/Container';
import { TypeAnimation } from 'react-type-animation';



function WordPage () {

    const [word, setWord] = useState(null)

    function get_word () {

        axios.get('get_word').then((response) => {
            setWord(response.data) //an object with word, audio, definition, pronounciation, speech, and stems as keys

        })
    }

    useEffect(()=> {
        get_word()
    }, [])


    return (
        <Container fluid className='section-marg start-below'>
            {word ? 
            <div>
                <DisplayWord word = {word.word} stems = {word.stems}/>
                <WordAudio audio = {word.audio} pronounciation = {word.pronounciation} />
                <HandleDefinition wordObject = {word} speech = {word.speech} definition={word.definition}/> 
             </div> 
            
            : 

            <TypeAnimation
                sequence={['Loading...', 5000]}
                style={{ fontSize: '3em' }}
                wrapper="h1"
                repeat={Infinity} // Repeat this Animation Sequence infinitely
            /> }
            

            

        </Container>
    )
}
export default WordPage