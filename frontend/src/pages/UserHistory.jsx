import axios from "axios"
import { useEffect } from "react"

import {useState} from 'react'
import WordSummary from "../components/WordSummary"


function UserHistory ({user}) {

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
        <div>
            {
                user && history ? 
                <span>
                <h1> {user.email} </h1>
                <hr></hr>
                {
                history.map((word, index) => {
                   return <WordSummary word = {word}/> 
                }) }
                </span>
       
                :

                <h1> Please log in to see the words you've learned!</h1>
            }

        </div>
    )
}

export default UserHistory