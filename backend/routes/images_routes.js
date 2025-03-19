import express from "express";
import getImage from "../controllers/images_give.js"
const router=express.Router();

router.route("/images/profile/:id").get(getImage);
export default router;