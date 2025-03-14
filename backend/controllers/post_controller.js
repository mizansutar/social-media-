
//import sharp from "sharp"
import uploadImageDb from "../db_imageUpload/post_upload.js";
import Post from "../models/Post_models.js";

import User from "../models/user_models.js"
import Comment from "../models/comment_model.js";

export const AddNewPost = async (req, res) => {
    try {
        const { caption } = req.body;
        const image = req.file;
        const autherId = req.id;

        if (!image) {
            return res.status(400).json({
                Message: "Iamage required "
            })
        }
        // image upload 
        const imageUrl = uploadImageDb(image)

        const post = await Post.create({
            caption,
            image: imageUrl,
            auther: autherId
        });


        const user = await User.findById(autherId);
        if (user) {
            user.posts.push(post._id);
            await user.save();
        }

        await post.populate({ path: "auther", select: "-password" });

        return res.status(201).json({
            message: "post created succesfully",
            post,
            success: true
        })

    } catch (error) {
        console.log(error)
    }
}

export const GetAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }).populate({ path: "auther", select: "username ,profilePic" }).populate({
            path: "comments", sort: { createdAt: -1 },
            populate: {
                path: "auther",
                select: "username,profilePic"
            }
        });
        return res.status(200).json({
            posts,
            success: true

        });


    } catch (error) {
        console.log(error)
    }
};

export const getUserPost = async (req, res) => {
    try {
        const autherId = req.id;
        const posts = await Post.find({ auther: autherId }).sort({ createdAt: -1 }).populate({
            path: 'auther',
            select: 'username ,profilePic'
        }).populate({
            path: "comments", sort: { createdAt: -1 },
            populate: {
                path: "auther",
                select: "username,profilePic"
            }
        });
        return res.status(200).json({
            posts,
            success: true

        });
    } catch (error) {
        console.log(error)
    }
};

export const likePost = async (req, res) => {
    try {
        const likedPersonId = req.id;
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                message: "post not found ",
                success: false

            })
        };

        // logic of liking of the post 

        await post.updateOne({ $addToSet: { likes: likedPersonId } });

        await post.save();

        return res.status(404).json({
            message: "liked post ",
            success: true

        })
        // implementing socket for the real time notification for the user to know to


    } catch (error) {
        console.log(error)
    }
}

export const DislikePost = async (req, res) => {
    try {
        const likedPersonId = req.id;
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                message: "post not found ",
                success: false

            })
        };

        // logic of liking of the post 

        await post.updateOne({ $pull: { likes: likedPersonId } });

        await post.save();

        return res.status(404).json({
            message: "liked post ",
            success: true

        })
        // implementing socket for the real time notification for the user to know to


    } catch (error) {
        console.log(error)
    }
};
export const addcommet = async (req, res) => {
    const postId = req.params.id;
    const commentDoingId = req.id;
    const { text } = req.body;
    const post = await Post.findById(postId);
    if (!text) {
        return res.status(404).json({
            message: "the text need to  fill",
            success: true
        })
    }
    // afdding the push to comment
    const comment = await Comment.create({
        text,
        auther: commentDoingId,
        post: postId
    }).populate({ path: "auther", select: "username  , profilePic" })
    post.comments.push(comment._id);
    await post.save();
    return res.status(404).json({
        message: "comment added",
        success: true
    })

}

export const getCommentsOfPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const comments = await Comment.find({ post: postId }).populate(
            'auther', 'username , profilePic'
        )
        if (!comments) {
            return res.status(201).json({
                message: "no comment found",
                success: false
            })
        }

        return res.status(201).json({
            message: "commets found",
            success: true,
            comments
        })
    } catch (error) {

    }
};

export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const autherId = req.id;
        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({
                message: "cpost not found",
                success: true,
            })
        }

// cheking the user logged in        
if (post.auther.toString()!=autherId.toString()) {
    if(!post){
        return res.status(403).json({
            message: "un othe",
            success: false,
        });}
        await Post.findByIdAndDelete(postId);
        // if the post is delete but in thee use post array having the post id there for need to remove the user id from the user post id from the usere collection there for the need to remove the 
        let user= User.findById(autherId);
        user.posts.filter(id=>id.toString()===postId)
            await user.save();
    await Comment.deleteMany({post:postId})  ;  

    return res.status(201).json({
        message: "post deleted",
        success: true,
    });
}




    } catch (error) {
        console.log(error)
    }
}

export const bookmarkPost=async (req,res) => {
    try {
       postId=req.params.id;
       autherId=req.id;
       const post =await findById(postId);
       if (!post) {
        return res.status(404).json({
            message: "post not found",
            success: false,
        })
       }
       const  user=await User.findById({autherId});
       if(user.bookmarks.includes(post._id)){
        // if al ready book marked for 
        await user.updateOne({$pull:{bookmarks:post._id}});
        await user.save();
        return res.status(200).json({
            message: "post removed from book mark",
            success: true,
            type:"unsaved"
        })

       }else{
        await user.updateOne({$addToSet:{bookmarks:post._id}});
        await user.save();
        return res.status(200).json({
            message: "post added from book mark",
            success: true,
            type:"saved"
        })
       }

    } catch (error) {
        
    }
}