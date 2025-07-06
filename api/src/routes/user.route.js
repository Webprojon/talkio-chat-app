import { Router } from "express";
import { deleteUser, getUser, getUsers } from "../controllers/user.controller.js";

const router = Router();

router.get("/", getUsers);
router.get("/id", getUser);
router.get("/id", deleteUser);

export default router;
