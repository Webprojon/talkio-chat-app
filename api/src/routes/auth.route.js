import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/auth.controller.js";
import upload from "../middleware/mutlerConfig.js";

const router = Router();

router.post("/sign-in", signIn);
router.post("/sign-up", upload.single("avatar"), signUp);
router.post("/sign-out", signOut);

export default router;
