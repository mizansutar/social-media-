import express from "express";

import isauth from "../controllers/middleware/isauth.js";
import { getMessage, sendMessage } from "../controllers/message_controller.js";

const router=express.Router();



router.route("/send/:id").post(isauth,sendMessage);
router.route("/all/:id").get(isauth,getMessage);

export default router;