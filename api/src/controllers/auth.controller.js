import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY, NODE_ENV } from "../config/env.js";

const MAX_AGE = 7 * 24 * 60 * 60 * 1000;

export const signUp = async (req, res) => {
	const { username, email, password } = req.body;

	try {
		// Check user exist or not
		const existUser = await prisma.user.findUnique({
			where: { email },
		});

		if (existUser) return res.json({ message: "This user already exist" });

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await prisma.user.create({
			data: {
				username,
				email,
				password: hashedPassword,
			},
		});

		// Generate token
		const token = jwt.sign({ userId: newUser.id }, JWT_SECRET_KEY, {
			expiresIn: MAX_AGE,
		});

		const isProduction = NODE_ENV === "production";

		res.cookie("token", token, {
			httpOnly: true,
			age: MAX_AGE,
			secure: isProduction,
			sameSite: isProduction ? "None" : "Lax",
		});

		res.status(201).json({ data: newUser, message: "User created successfully" });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Failed to create user !" });
	}
};

export const signIn = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (!user) return res.status(404).json({ message: "User not found" });

		// Check if password correct
		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) return res.status(404).json({ message: "Invalid password" });

		// Remove password before sending user data
		const { password: _, ...userWithoutPassword } = user;

		// Generate token
		const token = jwt.sign({ userId: user.id }, JWT_SECRET_KEY, {
			expiresIn: MAX_AGE,
		});

		const isProduction = NODE_ENV === "production";

		res.cookie("token", token, {
			httpOnly: true,
			age: MAX_AGE,
			secure: isProduction,
			sameSite: isProduction ? "None" : "Lax",
		});

		res.status(200).json({ data: userWithoutPassword, message: "User signed in successfully" });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Failed to sign in !" });
	}
};

export const signOut = (req, res) => {
	res.clearCookie("token").json({ message: "You are logged out" });
};
