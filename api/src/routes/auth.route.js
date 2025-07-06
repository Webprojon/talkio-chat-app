import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/auth.controller.js";

const router = Router();

router.post("/sign-in", signIn);
router.post("/sign-up", signUp);
router.post("/sign-out", signOut);

export default router;
