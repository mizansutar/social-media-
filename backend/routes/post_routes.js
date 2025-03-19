import express from "express";

import isauth from "../controllers/middleware/isauth.js";
import upload from "../controllers/middleware/multer.js";
import { addcommet, AddNewPost, bookmarkPost, deletePost, DislikePost, GetAllPosts, getCommentsOfPost, getUserPost, likePost } from "../controllers/post_controller.js";

const router=express.Router();

router.route("/addpost").post(isauth,upload.single("image"),AddNewPost);
router.route("/all").get(isauth,GetAllPosts);
router.route("/userpost").get(isauth,getUserPost);

router.route("/:id/like").get(isauth,likePost);


router.route("/:id/dislike").get(isauth,DislikePost);


router.route("/:id/comment").post(isauth,addcommet);

router.route("/:id/comment/all").post(isauth,getCommentsOfPost);


router.route("/delete/:id").post(isauth,deletePost);


router.route("/:id/bookmark").post(isauth,bookmarkPost);

export default router;