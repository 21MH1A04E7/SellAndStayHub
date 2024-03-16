import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
//creating schema
const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    }
},{timestamps:true})//for extra information about user timestamps will be added 

const User=mongoose.model('User',userSchema)
export default User
