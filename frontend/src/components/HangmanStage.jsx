
import {Mug} from 'react-kawaii'

import {Row, Col, Container, Modal} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {useEffect, useState} from 'react'

function HangmanStage ({stage}) {

    const stages = ['lovestruck', 'blissful',  'excited', 'happy',  'shocked', 'sad', 'ko' ]

    const [width, setWidth] = useState(418) //smallest width possible
    const [size, setSize] = useState(20)
    
    function MugSize (wid) {
        if (wid > 972) {
            setSize(70)
        }
        else if (wid > 848) {
            setSize(60)
        }
        else if (wid > 760) {
            setSize(50)
        }
        else if (wid > 648) {
            setSize(40)
        }
        else if (wid > 550) {
            setSize(30)
        } else if (wid > 418) {
            setSize(20)
        }
    }

    function detectSize () {
        setWidth(window.innerWidth)
        MugSize(window.innerWidth)
    }

    useEffect(() => {

        setWidth(window.innerWidth)
        MugSize(window.innerWidth)
        window.addEventListener('resize', detectSize)
      }, [])

    return (
        <Container fluid className = 'cuppies'>
            {
                width < 418 ? 
                <Modal show={true}>
                <Modal.Header>
                  <Modal.Title>Screen too small!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Your screen size is too small to play this mode!   <Link to = "/"> Return Home</Link></Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
              
              </Modal>
                :
            
            <Row>
            {stages.map((cup, index)=> {
                if (index === stage) {
                    return <Col><Mug size = {size+20} mood = {cup} color="#FFD6FF"/></Col>
                }
                return <Col><Mug size = {size} mood = {cup} color="#FFEBFF"/></Col>
            })}
            </Row> }

         </Container>
    )
}

export default HangmanStage