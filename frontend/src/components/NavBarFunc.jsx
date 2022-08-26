
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios'
import { Backpack } from 'react-kawaii';

function NavBarFunc ({whoAmI, user}) {

  const logOut = function(){
    console.log('logout')
    axios.post('/logout').then((response)=>{
      console.log('response from server: ', response)
      whoAmI()
      document.location.href = '/'
    })
  }


    return (

        <Navbar variant="light" fixed = 'top' className = 'navbarr'>
        <Container className = 'navbarr'>
          {
            user ? <Navbar.Brand href="/"><Backpack size={50} mood= {user.avatar_mood} color={user.avatar_color} /> </Navbar.Brand>
            : 
            <Navbar.Brand href="/">Home</Navbar.Brand>
          }
          
          {
            user ? 
            <Nav className="me-auto">
              <Nav.Link href="/#/word">Learn a word</Nav.Link>
              <Nav.Link href="/#/leaderboard">Leaderboard</Nav.Link>
              <Nav.Link href="/#/hangman">Cuppy</Nav.Link> 
              <Nav.Link href="/#/avatar">Profile</Nav.Link> 
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