import express from 'express';
import {connecteMongoDb} from './db.js'
import dotenv from 'dotenv'
import userRouter from './routes/userRouter.js';
import authRouter from './routes/authRoute.js';
import cookieParser from 'cookie-parser'
import listingRouter from './routes/listingRoute.js'
dotenv.config()
const app=express()


connecteMongoDb(process.env.Mongo)
.then(()=>{
    console.log('Connected to')
})
.catch((err)=>{
    console.log(`error ${err}`)
})

//middleWare
app.use(express.json())
//error handler middleWare
app.use(cookieParser())


app.listen(8080,()=>{
    console.log("server started!")
})

app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)
app.use('/api/listing',listingRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
});