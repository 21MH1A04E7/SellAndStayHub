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

userSchema.pre('save',async function (next){
    const user=this
    if(!user.isModified('password')) return next()
    try{
        const salt=await bcryptjs.genSalt(10)
        const hashedPassword=await bcryptjs.hashSync(user.password,salt)
        user.password=hashedPassword
        next()
    }
    catch(err){
        return next(err)
    }
})

const User=mongoose.model('User',userSchema)
export default User
