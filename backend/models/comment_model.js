import { text } from "express";
import mongoose, { Types } from "mongoose";

const commentSchema=new mongoose.Schema({
    text:{
        type:String,
        default:""
    },
    auther:{
        type:mongoose.Schema.Types.ObjectId , ref:"User" , required:true,
    },
    post:{type:mongoose.Schema.Types.ObjectId,ref:"Post",required:true,},

    
});
export default Comment=mongoose.model("Post".commentSchema);