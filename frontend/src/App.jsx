import 'bootstrap/dist/css/bootstrap.min.css';

import { useState, useEffect } from 'react'
import './App.css'
import {HashRouter, Routes, Route} from "react-router-dom"
import HomePage from './pages/homepage'
import SignUpPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'

import axios from 'axios'
import NavBarFunc from './components/NavBarFunc'
import WordPage from './pages/WordPage'
import LeaderBoardPage from './pages/LeaderBoardPage'

import {Planet} from 'react-kawaii';
import Icon from './components/test';
import Hangman from './pages/Hangman';


const getCSRFToken = ()=>{
  let csrfToken

  // the browser's cookies for this page are all in one string, separated by semi-colons
  const cookies = document.cookie.split(';')
  for ( let cookie of cookies ) {
      // individual cookies have their key and value separated by an equal sign
      const crumbs = cookie.split('=')
      if ( crumbs[0].trim() === 'csrftoken') {
          csrfToken = crumbs[1]
      }
  }
  return csrfToken
}
console.log('token? ', getCSRFToken())
axios.defaults.headers.common['X-CSRFToken'] = getCSRFToken()

function App() {

  const [user, setUser] = useState(null)


  const whoAmI = async () => {
    const response = await axios.get('/whoami')
    const user = response.data && response.data[0] && response.data[0].fields
    // const user = response.data[0].fields
    console.log('user from whoami? ', user, response)
    setUser(user)
  }

  useEffect(()=>{
    console.log('who')
    whoAmI()
  }, [])



  return (
    <div className="App">
       {/* <Planet size={200} mood="blissful" color="#FDA7DC" /> */}
        {/* <Icon/> */}
      <HashRouter>
        <NavBarFunc whoAmI={whoAmI} user = {user}/>
        <Routes>
          <Route path = '' element = {<HomePage user = {user} whoAmI={whoAmI} /> }/>
          <Route path = 'signup' element = {<SignUpPage/>}/>
          <Route path = 'login' element = {<LoginPage user = {user} whoAmI={whoAmI}/>} />
          <Route path = 'word' element = {<WordPage/>} />
          <Route path = 'leaderboard' element ={ <LeaderBoardPage/>} />
          <Route path = 'hangman' element = {<Hangman/>} />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
