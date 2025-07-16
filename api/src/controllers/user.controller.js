import prisma from "./../lib/prisma.js";

export const getUsers = async (req, res) => {
	try {
		// 1 way - Send users data without password
		//const users = await prisma.user.findMany({
		//	select: { id: true, username: true, email: true, avatar },
		//});

		const users = await prisma.user.findMany();

		// 2 way - Send users data without password
		const usersWithoutPassword = users.map(({ password, ...rest }) => rest);

		res.status(200).json({ success: true, data: usersWithoutPassword });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Failed to fetch users" });
	}
};

export const getUser = async (req, res) => {
	try {
		const { id } = req.params;

		const user = await prisma.user.findUnique({
			where: { id },
		});

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Send user data without password
		const { password: _, ...userWithoutPassword } = user;

		res.status(200).json({ success: true, data: userWithoutPassword });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Failed to fetch user" });
	}
};

export const getCurrentUser = async (req, res) => {
	try {
		const userId = req.user?.id;

		const user = await prisma.user.findUnique({
			where: { id: userId },
		});

		if (!user) return res.status(404).json({ message: "User not found" });

		const { password: _, ...userWithoutPassword } = user;

		res.status(200).json({ success: true, data: userWithoutPassword });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Failed to fetch user" });
	}
};

export const deleteUser = async (req, res) => {
	try {
		const { id } = req.params;
		const tokenUserId = req.user.id;

		if (id !== tokenUserId) {
			return res.status(403).json({
				message: "You are not authorized to delete another user's account.",
			});
		}

		// Finding all chats which are belong to current user
		const chats = await prisma.chat.findMany({
			where: {
				userIDs: {
					has: tokenUserId,
				},
			},
			select: {
				id: true,
			},
		});

		// Finding all messages which are belong to these chats
		const chatIds = chats.map((chat) => chat.id);

		await prisma.message.deleteMany({
			where: {
				chatId: { in: chatIds },
			},
		});

		// Deleting chats
		await prisma.chat.deleteMany({
			where: {
				id: { in: chatIds },
			},
		});

		// Finally deleting user
		await prisma.user.delete({
			where: { id },
		});

		res.status(200).json({
			success: true,
			message: "User account deleted successfully",
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Failed to delete user" });
	}
};
