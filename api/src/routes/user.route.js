import { Router } from "express";
import { deleteUser, getCurrentUser, getUser, getUsers } from "../controllers/user.controller.js";
import { authorize } from "./../middleware/auth.middleware.js";

const router = Router();

router.get("/", getUsers);
router.get("/me", authorize, getCurrentUser);
router.get("/:id", getUser);
router.delete("/:id", authorize, deleteUser);

export default router;
