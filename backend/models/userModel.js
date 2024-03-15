import mongoose from "mongoose";

//creating schema
const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true,
    },
    userEmail:{
        type:String,
        required:true,
        unique:true,
    },
    Password:{
        type:String,
        required:true,
    }
},{timestamps:true})//for extra information about user timestamps will be added 


const User=mongoose.model('User',userSchema)
export default User
