import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/env.js";
import prisma from "../lib/prisma.js";

export const authorize = async (req, res, next) => {
	try {
		const token = req.cookies?.token;

		if (!token) return res.status(401).json({ message: "Unauthorized" });

		const decoded = jwt.verify(token, JWT_SECRET_KEY);

		const user = await prisma.user.findUnique({
			where: { id: decoded.userId },
		});

		if (!user) return res.status(401).json({ message: "Unauthorized" });

		req.user = user;

		next();
	} catch (err) {
		res.status(401).json({ message: "Unauthorized", error: err.message });
	}
};
