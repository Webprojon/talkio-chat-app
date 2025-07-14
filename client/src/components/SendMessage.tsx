import { IoIosSend } from "react-icons/io";
import { apiRequest } from "../lib/apiRequest";
import useChatUserStore from "../store/chatUser";
import { useState } from "react";
import type { ActiveChatUser } from "../lib/types";

export default function SendMessage() {
	const [message, setMessage] = useState("");
	const { activeChatUser } = useChatUserStore() as { activeChatUser: ActiveChatUser | null };

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!message.trim()) return;

		try {
			await apiRequest.post(`messages/${activeChatUser?.data?.id}`, { text: message }, { withCredentials: true });
		} catch (err) {
			console.log(err);
		} finally {
			setMessage("");
		}
	};

	return (
		<form onSubmit={handleSubmit} className="flex gap-4">
			<textarea
				name="message"
				value={message}
				placeholder="Message"
				onChange={(e) => setMessage(e.target.value)}
				className="font-light flex-1 p-2 border rounded-sm outline-0 placeholder-color"
			></textarea>
			<button className="group px-4 border rounded-sm cursor-pointer text-sky-300">
				<IoIosSend className="size-7 group-hover:scale-110 transition-all" />
			</button>
		</form>
	);
}
