import express from "express";
import { authorize } from "../middleware/auth.middleware.js";
import { addMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.post("/:chatId", authorize, addMessage);

export default router;
