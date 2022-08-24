import { useState, useEffect } from 'react'
import DisplayPuzzle from '../components/DisplayPuzzle'
import UserGuess from '../components/UserGuess.jsx'
import DisplayGuesses from '../components/DisplayGuesses'

import axios from 'axios'

function Hangman () {

    const [puzzle, setPuzzle] = useState('')
    const [lettersGuessed, setLettersGuessed] = useState([])

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
    
        if (wrongGuesses.length >=6) {
          alert(`You have lost the game! The word was ${puzzle.word}.`)
          return  //end the function
        }
    
        const userGuess = document.getElementById('user-guess').value.toLowerCase() //in case the user input a capitalize letter
    
        if (userGuess === '') {
          alert('Please input a guess!')
          return //end the function
        } else if (lettersGuessed.includes(userGuess)) {
          alert('You have already guessed this letter!')
          return //end the function
        }
        const letters = [...lettersGuessed, userGuess]
        // lettersGuessed.push(userGuessed) don't do that because you are directly altering the state
        setLettersGuessed(letters)
        document.getElementById('user-guess').value = ''
    
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
        (puzzle && checkVictory() ) ? 
        // display this part if checkVictory() and puzzle != "" are true
        <div> 
           <h1>Gratz! You won! The word was {puzzle.word}. </h1>
           <button onClick={() => window.location.reload()}> Click to restart the game!</button>
         </div>

         :
         // display this part if either checkVictory() and puzzle != "" are false
         puzzle &&

         <div>
            <h1> Hangman App</h1>
             <hr></hr>
   
        <DisplayPuzzle puzzle = {puzzle} lettersGuessed = {lettersGuessed}/>
          <UserGuess submitGuess={submitGuess}/>
          <DisplayGuesses wrongGuesses = {wrongGuesses}/>
          </div>
      }


        </div>
    )
}

export default Hangman