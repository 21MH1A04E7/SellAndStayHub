import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import {useDispatch} from 'react-redux'
import {signInSuccess} from '../redux/user/userSlice'
import {app} from '../firebase'
import {useNavigate} from 'react-router-dom'
function OAuth() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const handleGoogleClick=async ()=>{
    try{
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result=await signInWithPopup(auth,provider)
      console.log(result)
      const res=await fetch('/api/auth/google',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({name:result.user.displayName,email:result.user.email,photo:result.user.photoURL}),
      });
      const data=await res.json()
      dispatch(signInSuccess(data))
      navigate('/')
    }catch(error){
      console.log('could not signin with google accout!',error)
    }
  }
  return (
    <button onClick={handleGoogleClick} type='button' className='bg-[#833471] p-1.5 text-white font-semibold rounded-lg uppercase
    hover:opacity-90 '>Google</button>
  )
}

export default OAuth