import React, { useState,useEffect } from 'react'
import {app} from '../firebase.js'
import {useSelector} from 'react-redux'
import { useRef } from 'react'
import { set } from 'mongoose';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';

function ProfilePage() {
  const fileRef=useRef(null);
  const {currentUser}=useSelector((state)=>state.user)
  const [file,setFile]=useState(undefined)
  const [filePercentage,setFilePercentage]=useState(0)
  const [fileUploadError,setFileUploadError]=useState(false)
  const [formData,setFormData]=useState({})
   // console.log(file)
  // console.log(formData)
    console.log(filePercentage)
  //   console.log(fileUploadError)
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
          setFilePercentage(progress.toFixed(2))
        },
       
        (error)=>{
          setFileUploadError(true);
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL)=>{
            setFormData({...formData,avatar: downloadURL});
          })
        }
        );
          
  }
  return (
    <div className='p-2 max-w-sm mx-auto'>
      <h2 className='text-3xl text-center font-bold my-5 italic hover:not-italic'>profile</h2>
      <form className='flex flex-col gap-2'>
        <input onChange={(e)=>setFile(e.target.files[0])} type='file' ref={fileRef} hidden accept='image./*'/>
        <img  src={formData.avatar||currentUser.avatar} onClick={()=>fileRef.current.click()} alt="profile" className='rounded-xl object-cover cursor-pointer w-24 self-center transition-transform hover:scale-110 ease-in-out shadow-md'/>
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700 italic'>
              Error while uploading the file
            </span>
          ) : filePercentage > 0 && filePercentage < 100 ? (
            <span className='text-slate-700'>{`Uploading.. ${filePercentage}%`}</span>
          ) : filePercentage == 100.00 ? (
            <span className='text-green-800 italic'>successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
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