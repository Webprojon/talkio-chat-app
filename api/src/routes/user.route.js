import { Router } from "express";
import { deleteUser, getUser, getUsers } from "../controllers/user.controller.js";
import { authorize } from "./../middleware/auth.middleware.js";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.delete("/:id", authorize, deleteUser);

export default router;
