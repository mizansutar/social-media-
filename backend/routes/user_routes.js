import express from "express";

import {editProfile, followerorfollowing, getProfile, login, logout, register, sugestedUsers} from "../controllers/user_controller.js"
import isauth from "../controllers/middleware/isauth.js";
const router=express.Router();



router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/:id/profile").get(isauth,getProfile);
// need to add image midel ware and image uploading proccess
router.route("/profile/edit").get(isauth,editProfile);

router.route("suggested").get(isauth,sugestedUsers);

router.route("/followorunfollow/:id").post(isauth,followerorfollowing);


export default router;