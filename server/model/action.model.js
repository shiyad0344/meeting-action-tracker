import mongoose, { Schema } from "mongoose";


const actionSchema= new mongoose.Schema({
    transcriptId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'transcript'
    },
    task: String,
    owner: String,
    dueDate: Date,
    status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending"
  }
},{timestamps:true})

export const Action=mongoose.model('Action',actionSchema)