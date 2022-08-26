import axios from 'axios'
import { useEffect } from 'react'
import {useState} from 'react'
import Container from 'react-bootstrap/Container';

import {Col, Row} from 'react-bootstrap'

import ListGroup from 'react-bootstrap/ListGroup';
import { Backpack } from 'react-kawaii';

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
        <Container fluid className = 'leaderboard start-below'>
            
            <ListGroup as= 'ol'>

            <ListGroup.Item as="li" className= 'leader-heading'>
                <Row>
                    <Col xs = {2} >Rank:</Col>
                    <Col xs = {3} >Avatar</Col>
                    <Col xs = {4} >User</Col>
                    <Col xs = {3} >Words</Col>
                </Row>
        </ListGroup.Item>

            {ranking && ranking.map((user, index) =>{
                return <ListGroup.Item as="li">
                    <Row>
                    <Col xs = {2}>{index+1}.</Col>
                    <Col xs = {3} >
                         <Backpack size={50} mood= {user.avatar_mood} color={user.avatar_color} /> 
                    </Col>
                    <Col xs = {4} > 
                    {user.user}
                    </Col>
                    <Col xs = {3} >{user.words}</Col>
                    </Row>

                    </ListGroup.Item>
            })}
            </ListGroup>
        </Container>
    )


}

export default LeaderBoardPage