import express from "express";
import { authorize } from "./../middleware/auth.middleware.js";
import { addChat, deleteChat, getChat, getChats } from "../controllers/chat.controller.js";

const router = express.Router();

router.get("/", authorize, getChats);
router.get("/:id", authorize, getChat);
router.post("/", authorize, addChat);
router.delete("/:id", authorize, deleteChat);

export default router;
