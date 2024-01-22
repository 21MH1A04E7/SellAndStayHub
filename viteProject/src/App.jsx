import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import ProfilePage from './Pages/ProfilePage'
import SingIn from './Pages/SingIn'
import SingUp from './Pages/SingUp'
function App() {
 

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/profilePage' element={<ProfilePage/>} />
        <Route path='/singIn' element={<SingIn/>} />
        <Route path='/singUp' element={<SingUp/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
