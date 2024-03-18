import React from 'react'
import {useSelector} from 'react-redux'
function ProfilePage() {
  const {currentUser}=useSelector((state)=>state.user)
  return (
    <div className='p-2 max-w-sm mx-auto'>
      <h2 className='text-3xl text-center font-bold my-5 italic hover:not-italic'>profile</h2>
      <form className='flex flex-col gap-2'>
        <img src={currentUser.avatar} alt="profile" className='rounded-xl object-cover cursor-pointer w-22 h-22 self-center transition-transform hover:scale-110 ease-in-out shadow-md'/>
        <input type='text' placeholder='userName' id='username' className='border  p-2 rounded-lg mt-2 bg-slate-100'/>
        <input type='email' placeholder='Email' id='email' className='border p-2 rounded-lg mt-2 bg-slate-100'/>
        <input type='password' placeholder='password' id='password' className='border p-2 rounded-lg mt-2 bg-slate-100'/>
        <button className='bg-[#5352ed] rounded-lg p-2 uppercase hover:opacity-90 disabled:opacity-80 text-white'>update</button>
      </form>
      <div className='flex justify-between mt-2'>
        <span className='text-red-600 cursor-pointer'>delete account</span>
        <span className='text-red-600 cursor-pointer'>Logout</span>
      </div>
    </div>
  )
}

export default ProfilePage