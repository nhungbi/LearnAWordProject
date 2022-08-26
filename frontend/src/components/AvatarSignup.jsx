

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Container} from 'react-bootstrap'

function AvatarSignup ({setColor, setMood, saveAvatar}) {



    const moods = ['happy', 'shocked', 'sad', 'blissful', "lovestruck", "excited", "ko"]

    const colors = [['white', '#FFFFFF'],["Pink Lace", '#FFD6FF'], ["Mauve",'#E7C6FF'], ["Maximum Blue Purple", '#C8B6FF'], ["Lavender", '#B8C0FF'], ["Lavender Blue",'#BBD0FF'], ["Mauvelous",'#E8A6B3'], ["Cherry Blossom Pink",'#FFB7C5'], ["Unbleached Silk", '#FED4C2'], ["Blond",'#FCF6BD'], ["Nyanza", '#E6F5CE'], ["Aero Blue",'#D0F4DE'], ["Powder Blue",'#BDE9EC'], ["Uranian Blue",'#A9DEF9'], ["Lavender Light Blue", '#C7D0F9'], ["Light Purple",'#E4C1F9']] //valid Hex color

    function colorChange (event) {
        setColor(event.target.value)
    }

    function moodChange (event) {
        setMood(event.target.value)
    }


    return (

        <div>
            <Form  className = 'form-section' onSubmit={saveAvatar} >
                <Form.Group className="mb-3">
                        <Form.Label>Select a mood for your avatar</Form.Label>
                        <Form.Select onChange = {moodChange}>
                        <option>Moods</option>
                        {
                            moods.map((m) => <option>{m}</option>)
                        }
                        </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Select a color for your avatar</Form.Label>
                    <Form.Select onChange = {colorChange}>
                        <option>Colors</option>
                        {
                            colors.map((c)=> <option value = {c[1]}>{c[0]}</option>)
                        }
                    </Form.Select>
                </Form.Group>
               
                <Button size="lg" variant="outline-secondary" type="submit">Save Avatar</Button>

            </Form>

        </div>
    )


}

export default AvatarSignup