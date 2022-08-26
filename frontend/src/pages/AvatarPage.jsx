import AvatarSignup from "../components/AvatarSignup"
import {useState, useEffect} from 'react'
import { Backpack } from 'react-kawaii'
import axios from 'axios'
import EditProfileModal from "../components/EditProfileModal"
import ErrorModal from "../components/ErrorModal"
import {Row, Col, Container} from 'react-bootstrap'

function AvatarPage ({user}) {


    const [color, setColor] = useState('#FFFFFF')
    const [mood, setMood] = useState('happy')
    const [error, setError] = useState('')

    
    function saveAvatar (event) {
        event.preventDefault()
        axios.put('save_avatar', {avatar_color: color, avatar_mood: mood}).then((response) => {
            document.location.reload()
        })
    }

    useEffect( ()=> {
        axios.get('get_avatar').then((response)=> {
            setColor(response.data.avatar_color)
            setMood(response.data.avatar_mood)
        })
    }, [])

    return (
        <div>
            {user && 
            <Row className = 'avatar-section'>
            <Col>
                <Backpack size={400} mood={mood} color={color} />
            </Col>

            <Col className = 'col-avatar'>
                <AvatarSignup  setColor = {setColor} setMood = {setMood} saveAvatar = {saveAvatar}/>
            </Col>
            </Row>
            }
            {user && <EditProfileModal setError = {setError}
             user = {user}/>}
             

            {error && <ErrorModal setError = {setError} error = {error}/>}
        </div>
    )
}

export default AvatarPage