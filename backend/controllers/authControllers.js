import User from '../models/userModel.js'
import {errorHandler} from '../utils/error.js'
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const signup=async (req,res,next)=>{
    const {userName,email,password}=req.body
    if(!userName||!email||!password) return next(errorHandler(404,'inter details'))
    const salt=await bcryptjs.genSalt(10)
    const hashedPassword = bcryptjs.hashSync(password, salt);
    const newUser = new User({ userName, email, password: hashedPassword });
   try{
    const response=await newUser.save();
    res.status(201).json('User created successfully!');
   }
   catch(err){
    next(err)
   }
}

export const signin=async (req,res,next)=>{
    const {email,password}=req.body
    try{
        const user=await User.findOne({email})
        if(!user){
            return next(errorHandler(404,'User not found'))
        }
        const isMatch=bcryptjs.compareSync(password,user.password)
        if(!isMatch){
            return next(errorHandler(401,'Wrong credentials..'))
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
        const {password:pass,...rest}=user._doc
        res.cookie('access_token',token,{httpOnly:true})
        .status(200)
        .json(rest)
    }
    catch(err){
        next(err)
    }
}