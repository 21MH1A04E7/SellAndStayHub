import React from 'react'
import {BrowserRouter,Routes,Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import ProfilePage from './Pages/ProfilePage'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Layout from './Layout'
import PrivateRoute from './components/PrivateRoute'
import CreateListing from './Pages/CreateListing'
import UpdateListing from './Pages/UpdateListing'
import Search from './Pages/Search'
import Listing from './Pages/Listing'
const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/search' element={<Search/>}/>
      <Route path='/listing/:listingId' element={<Listing/>}/>
      <Route element={<PrivateRoute/>}>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/create-listing' element={<CreateListing/>}/>
        <Route path='/update-listing/:listingId' element={<UpdateListing/>}/>
      </Route>
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
