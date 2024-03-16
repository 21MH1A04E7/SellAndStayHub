import User from '../models/userModel.js'
import {errorHandler} from '../utils/error.js'

export const signup=async (req,res,next)=>{
   try{
    const {userName,email,password}=req.body
    const newUser=new User({userName,email,password})
    const response=await newUser.save()
    if(!response){
        return res.status(500).json({message:"internal server error"})
    }
    res.status(201).json({message:"success"})
   }
   catch(err){
    console.log('internal server error')
    next(errorHandler(200,'enter'))
   }
}