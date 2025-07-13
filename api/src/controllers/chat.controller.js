import prisma from "../lib/prisma.js";

export const getChats = async (req, res) => {
	const tokenUserId = req.user.id;

	try {
		const chats = await prisma.chat.findMany({
			where: {
				userIDs: {
					hasSome: [tokenUserId],
				},
			},
		});

		for (const chat of chats) {
			const receiverId = chat.userIDs.find((id) => id !== tokenUserId);

			if (!receiverId) {
				console.warn(`Receiver ID not found for chat: ${chat.id}`);
				continue;
			}

			const receiver = await prisma.user.findUnique({
				where: {
					id: receiverId,
				},
				select: {
					id: true,
					username: true,
					avatar: true,
				},
			});

			chat.receiver = receiver;
		}

		res.status(200).json({ success: true, data: chats });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Failed to get chats" });
	}
};

export const getChat = async (req, res) => {
	const tokenUserId = req.user.id;

	try {
		const chat = await prisma.chat.findUnique({
			where: {
				id: req.params.id,
				userIDs: {
					hasSome: [tokenUserId],
				},
			},
			include: {
				messages: {
					orderBy: {
						createdAt: "asc",
					},
				},
			},
		});

		res.status(200).json({ success: true, data: chat });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Failed to get chat" });
	}
};

export const addChat = async (req, res) => {
	const tokenUserId = req.user.id;
	const receiverId = req.body.receiverId;

	try {
		const existingChat = await prisma.chat.findFirst({
			where: {
				userIDs: {
					hasEvery: [tokenUserId, receiverId],
				},
			},
		});

		if (existingChat) {
			return res.status(400).json({ message: "You are already connected" });
		}

		const newChat = await prisma.chat.create({
			data: {
				userIDs: [tokenUserId, receiverId],
			},
		});

		res.status(200).json({ success: true, data: newChat });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Failed to add chat" });
	}
};

export const deleteChat = async (req, res) => {
	try {
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Failed to delete chat" });
	}
};
