import mongoose, { Types } from "mongoose";

const postSchema=new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    image:{
        type:String,
        required:true,
    },
    auther:{
        type:mongoose.Schema.Types.ObjectId , ref:"User" , required:true,
    },
    likes:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],

    comments:[{type:mongoose.Schema.Types.ObjectId , ref:"Comment"}],
});
export default Post=mongoose.model("Post".postSchema);