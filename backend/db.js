import mongoose from "mongoose";

export async function connecteMongoDb(url){
    mongoose.connect(url);
}