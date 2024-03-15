import React from 'react'
import {BrowserRouter,Routes,Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import ProfilePage from './Pages/ProfilePage'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Layout from './Layout'

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/profile' element={<ProfilePage/>}/>
      <Route path='/sign-in' element={<SignIn/>}/>
      <Route path='/sign-up' element={<SignUp/>}/>
    </Route>
  )
)
function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
