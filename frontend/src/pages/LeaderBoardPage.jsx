import axios from 'axios'
import { useEffect } from 'react'
import {useState} from 'react'
import Container from 'react-bootstrap/Container';

import {Col, Row} from 'react-bootstrap'

import ListGroup from 'react-bootstrap/ListGroup';

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

            <ListGroup.Item as="li" active>
                <Row>
                    <Col xs = {2} sm = {2} md={2} lg = {2}>Rank:</Col>
                    <Col xs = {7} sm = {7} md={7} lg = {7}>User</Col>
                    <Col xs = {3} sm = {3} md={3} lg = {3}>Words</Col>
                    {/* <Col>Ranks</Col>
                    <Col>User Name</Col>
                    <Col>Words</Col> */}
                </Row>
        </ListGroup.Item>

            {ranking && ranking.map((user, index) =>{
                return <ListGroup.Item as="li">
                     <Row>
                    <Col xs = {2} sm = {2} md={2} lg = {2}>{index+1}.</Col>
                    <Col xs = {7} sm = {7} md={7} lg = {7}>{user.user}</Col>
                    <Col xs = {3} sm = {3} md={3} lg = {3}>{user.words}</Col>
                    </Row>
                    {/* {index+1}: {user.user} - {user.words}  */}
                    </ListGroup.Item>
            })}
            </ListGroup>
        </Container>
    )


}

export default LeaderBoardPage