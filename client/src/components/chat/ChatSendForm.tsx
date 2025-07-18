import { IoIosSend } from "react-icons/io";
import socket from "../../lib/socket";
import { apiRequest } from "../../lib/apiRequest";
import { useState, type Dispatch, type SetStateAction } from "react";
import type { ActiveChatUser, Message } from "../../lib/types";
import useChatUserStore from "../../store/chatUser";

export default function ChatSendForm({ setMessages }: { setMessages: Dispatch<SetStateAction<Message[]>> }) {
	const [text, setText] = useState("");
	const { activeChatUser } = useChatUserStore() as { activeChatUser: ActiveChatUser | null };

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!text.trim()) return;

		try {
			const res = await apiRequest.post(`messages/${activeChatUser?.data?.id}`, { text }, { withCredentials: true });
			const newMessage = res.data;

			setMessages((prev) => [...prev, newMessage]);

			socket.emit("sendMessage", {
				receiverId: activeChatUser?.receiver.id,
				data: newMessage,
			});
		} catch (err) {
			console.log(err);
		} finally {
			setText("");
		}
	};
	return (
		<form onSubmit={handleSubmit} className="flex gap-4">
			<textarea
				name="message"
				value={text}
				placeholder="Message"
				onChange={(e) => setText(e.target.value)}
				className="font-light flex-1 p-2 border rounded-sm outline-0 placeholder-color"
			></textarea>
			<button disabled={!text.trim()} className="group px-4 border rounded-sm cursor-pointer text-sky-300">
				<IoIosSend className="size-7 group-hover:scale-110 transition-all" />
			</button>
		</form>
	);
}
