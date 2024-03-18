import React, { useState,useEffect } from 'react'
import {app} from '../firebase.js'
import {useSelector} from 'react-redux'
import { useRef } from 'react'
import { set } from 'mongoose';
import {
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';

function ProfilePage() {
  const fileRef=useRef(null);
  const {currentUser}=useSelector((state)=>state.user)
  const [file,setFile]=useState(undefined)
  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  },[file])
  const handleFileUpload=(file)=>{
        const storage=getStorage(app)
        const fileName=new Date().getTime+file.name;//for unique file name
        const storageRef=ref(storage,fileName)
        const uploadTask=uploadBytesResumable(storageRef,file)
        
        uploadTask.on('state_changed',
        (snapshot)=>{
          const progress=((snapshot.bytesTransferred/snapshot.totalBytes)*100)
          console.log('progress'+progress+'done')
        },
        )
          
  }
  console.log(file)
  return (
    <div className='p-2 max-w-sm mx-auto'>
      <h2 className='text-3xl text-center font-bold my-5 italic hover:not-italic'>profile</h2>
      <form className='flex flex-col gap-2'>
        <input onChange={(e)=>setFile(e.target.files[0])} type='file' ref={fileRef} hidden accept='image./*'/>
        <img  src={currentUser.avatar} onClick={()=>fileRef.current.click()} alt="profile" className='rounded-xl object-cover cursor-pointer w-24 self-center transition-transform hover:scale-110 ease-in-out shadow-md'/>
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

// allow read;
//       allow write: if
//       request.resource.size < 2 * 1021 * 1024 &&
//       request.resource.contentType.matches('image/.*')