import mongoose from "mongoose";

const transcriptSchema= new mongoose.Schema({
    content:{
        type:String,
        required:true
    }
},{timestamps:true})

export const Transcript=mongoose.model("Transcript",transcriptSchema)