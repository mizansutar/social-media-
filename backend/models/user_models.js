import mongoose from "mongoose";

// the user model is created in models / user_models file and there are 
userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    profilePic:{
        type:String,
        default:"",

    },
    bio:{
        type:String,
        default:"",
        
    },
    follower:[{
        type:mongoose.Schema.Types.ObjectId,ref:"User",
    }],
    following:[{
        type:mongoose.Schema.Types.ObjectId,ref:"User",
    }],
    posts:[{type:mongoose.Schema.Types.ObjectId,ref:"Post"}],
    bookmarks:[{type:mongoose.Schema.Types.ObjectId,ref:"Post"}],

},{timestamps:true});

export  const User=mongoose.model("User",userSchema);