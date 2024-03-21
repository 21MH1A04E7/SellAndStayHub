import { errorHandler } from "./error.js";
import jwt from 'jsonwebtoken'
//installed cookie-parser
export const verifyToken=(req,res,next)=>{
    const token=req.cookies.access_token;
    if(!token){
        next(errorHandler(401,'you need to login first'));
    }
    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
        if(err){
            next(errorHandler(401,'token is not valid'));
        }
        req.user=decoded;
        next();
    })
}