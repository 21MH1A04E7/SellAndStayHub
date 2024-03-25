import User from "../models/userModel.js"
import Listing from "../models/listingModel.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'
export const updateUser=async (req,res,next)=>{
  if(req.user.id!=req.params.id) return next(errorHandler(401,'you have to loing'))
  try{
    if(req.body.password){
        req.body.password=bcryptjs.hashSync(req.body.password,10)
    }
    const updateUser=await User.findByIdAndUpdate(req.params.id,{
        $set:{
            userName:req.body.username,
            email:req.body.email,
            password:req.body.password,
            avatar:req.body.avatar
        }
    },{new:true})
    const {password,...rest}=updateUser._doc
    res.status(200).json(rest)
}catch(error){
    next(error)
}
}

export const deleteUser=async (req,res,next)=>{
    if(req.params.id!=req.user.id) return next(errorHandler(401,'you have to loing'))
    try{
        await User.findByIdAndDelete(req.params.id)
        res.clearCookie('access_token')
        res.status(200).json('user has been deleted');
    }catch(error){
        next(error)
    }
}

export const getUserListings=async (req,res,next)=>{
    if(req.user.id===req.params.id){
        try{
            const listing=await Listing.find({userData:req.params.id});
            res.status(200).json(listing);
        }catch(error){
    
        }
    }else{
     return next(errorHandler(401,'you can not get other user lisging'))   
    }
}
export const getUser=async (req,res,next)=>{
    try{
        const user=await User.findById(req.params.id);
        if(!user) return next(errorHandler(404,'user not found'));
        const {password:pass,...rest}=user._doc;
        res.status(200).json(rest);
    }catch(error){
        next(error);
    }
};