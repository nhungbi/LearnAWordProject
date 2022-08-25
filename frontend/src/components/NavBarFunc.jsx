
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios'

function NavBarFunc ({whoAmI, user}) {

  const logOut = function(){
    console.log('logout')
    axios.post('/logout').then((response)=>{
      console.log('response from server: ', response)
      whoAmI()
    })
  }


    return (

        <Navbar variant="light" fixed = 'top' className = 'navbarr'>
        <Container className = 'navbarr'>
          <Navbar.Brand href="/">Home</Navbar.Brand>

          {
            user ? 
            <Nav className="me-auto">
              <Nav.Link href="/#/word">Learn a word</Nav.Link>
              <Nav.Link href="/#/leaderboard">Leaderboard</Nav.Link>
              <Nav.Link href="/#/hangman">Cuppy</Nav.Link> 
              <Nav.Link onClick = {logOut}> Log out</Nav.Link>
            </Nav> 
            :
            <Nav className="me-auto">
              <Nav.Link href="/#/signup">Sign Up</Nav.Link>
              <Nav.Link href="/#/login">Login</Nav.Link>
              
            </Nav>
          }
        </Container>
      </Navbar>
    )
}

export default NavBarFunc