import User from '../models/userModel.js'
import {errorHandler} from '../utils/error.js'
import bcryptjs from "bcryptjs";
import jwttoken from 'jsonwebtoken';
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
    next(err)
   }
}

export const signin=async (req,res,next)=>{
    try{
        const {email,password}=req.body
        const user=await User.findOne({email})
        if(!user){
            return res.status(401).json({message:"user not found"})
        }
        const isMatch=bcryptjs.compareSync(password,user.password)
        if(!isMatch){
            return next(errorHandler(401,'Wrong credentials'))
        }
        const token=jwttoken.sign({id:user._id},process.env.JWT_SECRET)
        const {password:pass,...rest}=user._doc
        res.cookie('access_token',token,{httpOnly:true})
        .status(200)
        .json(rest)
    }
    catch(err){
        next(err)
    }
}