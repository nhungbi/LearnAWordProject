import axios from 'axios'
import { useEffect } from 'react'
import {useState} from 'react'
import Container from 'react-bootstrap/Container';

function LeaderBoardPage () {

    const [ranking, setRanking] = useState([])

    const get_leaderboard = () => {
        axios.get("get_leaderboard").then((response)=> {
            console.log(response)
            setRanking(response.data.ranking)
        })
    }

    useEffect( ()=> {
        get_leaderboard()
    }, [])

    console.log(ranking, 'rasafds')
    return (
        <Container fluid>
            {ranking && ranking.map((user, index) =>{
                return <h1>{index+1}: {user.user} - {user.words} </h1>
            })}
        </Container>
    )


}

export default LeaderBoardPage