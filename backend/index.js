import express from 'express';
import {connecteMongoDb} from './db.js'
import dotenv from 'dotenv'
dotenv.config()
const server=express()


connecteMongoDb(process.env.MOGOLOCAURL)
.then(()=>{
    console.log('Connected to')
})
.catch((err)=>{
    console.log(`error ${err}`)
})

server.listen(8080,()=>{
    console.log("server started!!")
})