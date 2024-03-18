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
    },
    avatar:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
    },
},{timestamps:true})//for extra information about user timestamps will be added 

const User=mongoose.model('User',userSchema)
export default User
