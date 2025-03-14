
import mongoose, { Types } from "mongoose";

const commentSchema=new mongoose.Schema({
    text:{
        type:String,
        default:""
    },
    auther:{
        type:mongoose.Schema.Types.ObjectId , ref:"User" , required:true,
    },
    posts:{type:mongoose.Schema.Types.ObjectId,ref:"Post",required:true,},

    
});
 const Comment=mongoose.model("Comments",commentSchema);

 export default Comment;