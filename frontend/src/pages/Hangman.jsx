import { useState, useEffect } from 'react'
import DisplayPuzzle from '../components/DisplayPuzzle'
import UserGuess from '../components/UserGuess.jsx'
import DisplayGuesses from '../components/DisplayGuesses'

import axios from 'axios'
import HangmanStage from '../components/HangmanStage'
import HangmanRules from '../components/HangmanRules'
import TypeCuppy from '../components/TypeCuppy'

import {Container} from 'react-bootstrap'
import LosingModal from '../components/LosingModal'
import HintModal from '../components/HintModal'
import WinningModal from '../components/WinningModal'

function Hangman () {

    const [puzzle, setPuzzle] = useState('')
    const [lettersGuessed, setLettersGuessed] = useState([])

    const [availableLetters, setAvailableLetters] = useState(["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"])

    function getPuzzle () {
        axios.get('get_user_history').then((response) => {
            const words = response.data.words
            setPuzzle(words[Math.floor(Math.random() * words.length)]) }// "word, audio, definition, pronounciation, speech, stems, date_learnd
        )}
    

    useEffect( () => {
       getPuzzle()
    }, [])

    const wrongGuesses = lettersGuessed.filter((guess) =>{ 
        return !puzzle.word.includes(guess)
      })

    const submitGuess = (event) => {
        event.preventDefault() //don't want the page to refresh

        console.log(event.target.value, 'heree')

    
        if (wrongGuesses.length >=6) {
          alert(`You have lost the game! The word was ${puzzle.word}.`)
          return  //end the function
        }
    
        const userGuess = event.target.value.toLowerCase()
    
        if (userGuess === '') {
          alert('Please input a guess!')
          return //end the function
        } else if (lettersGuessed.includes(userGuess)) {
          alert('You have already guessed this letter!')
          return //end the function
        }
        const letters = [...lettersGuessed, userGuess]

        setLettersGuessed(letters)
        setAvailableLetters(availableLetters.filter(letter=> letter != event.target.value)) //remove the guess
    
      }
    
      //return true if lettersGuessed include all of the letters in puzzle
      const checkVictory = () => {
        for (let letter of puzzle.word) {
          if (!lettersGuessed.includes(letter)) {
            return false
          }
        }
    
        return true
      }
    
    
 

    return (
        <div>
        {
         puzzle &&

         <Container fluid>
          <TypeCuppy />
          <HangmanStage stage = {wrongGuesses.length} />

          <h3> Number of wrong guesses left: {6- wrongGuesses.length}</h3> 

          <HangmanRules />
          <HintModal word = {puzzle} />
          <hr></hr>
   
          <DisplayPuzzle puzzle = {puzzle} lettersGuessed = {lettersGuessed}/>
          <UserGuess availableLetters = {availableLetters} submitGuess={submitGuess}/>
          <DisplayGuesses wrongGuesses = {wrongGuesses}/>
          </Container>
      }

      {// losing screen

      wrongGuesses.length >= 6 && <LosingModal puzzle = {puzzle}/>

      }

      {
        puzzle && checkVictory() && <WinningModal puzzle = {puzzle} />
      }


        </div>
    )
}

export default Hangman