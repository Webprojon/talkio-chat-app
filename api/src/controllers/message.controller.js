import prisma from "../lib/prisma.js";

export const addMessage = async (req, res) => {
	const tokenUserId = req.user.id;
	const chatId = req.params.chatId;
	const text = req.body.text;

	try {
		const chat = await prisma.chat.findUnique({
			where: {
				id: chatId,
				userIDs: {
					hasSome: [tokenUserId],
				},
			},
		});

		if (!chat) return res.status(404).json({ message: "Chat not found!" });

		const message = await prisma.message.create({
			data: {
				text,
				chatId,
				userId: tokenUserId,
			},
		});

		await prisma.chat.update({
			where: {
				id: chatId,
			},
			data: {
				lastMessage: text,
			},
		});

		res.status(200).json(message);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Failed to add message" });
	}
};
