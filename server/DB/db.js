import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export const dbConnect=async()=>{
    try {
     const conn= await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
             // console.log(`${process.env.MONGODB_URI}`)
       console.log("MONGODB connection established",conn.connection.host)
    } catch (error) {
        // console.log(`${process.env.MONGODB_URI}`)
        console.error("mongoDb connection failed",error)
        process.exit(1)
    }
}