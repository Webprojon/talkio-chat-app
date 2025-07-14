import { useEffect, useRef, useState } from "react";
import type { ActiveChatUser, Chat } from "../lib/types";
import useChatUserStore from "../store/chatUser";
import { apiRequest } from "../lib/apiRequest";
import { IoIosSend } from "react-icons/io";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { format } from "timeago.js";

export default function Chat() {
	const [text, setText] = useState("");
	const { currentUser } = useCurrentUser();
	const [chat, setChat] = useState<Chat>({ messages: [] });
	const messageRef = useRef<HTMLDivElement | null>(null);
	const { activeChatUser } = useChatUserStore() as { activeChatUser: ActiveChatUser | null };

	useEffect(() => {
		if (activeChatUser) {
			setChat({ messages: activeChatUser.data.messages });
		}
	}, [activeChatUser]);

	useEffect(() => {
		messageRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [chat.messages]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!text.trim()) return;

		try {
			const res = await apiRequest.post(`messages/${activeChatUser?.data?.id}`, { text }, { withCredentials: true });
			setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
		} catch (err) {
			console.log(err);
		} finally {
			setText("");
		}
	};

	return (
		<div className="flex-col gap-4 justify-between flex-2 px-4 py-2 hidden sm:flex">
			{activeChatUser ? (
				<>
					{/* Chat Header */}
					<div className="flex items-center gap-3 border-b pb-2">
						<img src={activeChatUser?.receiver.avatar || "./noavatar.png"} alt="user img" className="w-9 h-9 rounded-full object-cover border" />
						<div className="flex flex-col">
							<span className="text-sm font-medium">{activeChatUser?.receiver.username}</span>
							<p className="text-xs text-stone-400">last seen recently</p>
						</div>
					</div>

					{/* Chat Messages */}
					<div className="h-105">
						<div className="flex flex-col gap-5 flex-[2] w-full h-full overflow-y-scroll noscrollbar">
							{chat.messages.map(({ id, createdAt, text, userId }) => (
								<div key={id} className={`flex gap-3 max-w-[55%] sm:max-w-[50%] ${userId === currentUser.id ? "self-end" : "flex-row-reverse self-start"}`}>
									<div className="px-2 py-1 rounded-sm bg-[#252932]">
										<p className="text-sm font-light">{text}</p>
										<span className="pt-1 text-xs font-light text-stone-400">{format(createdAt)}</span>
									</div>
								</div>
							))}
							{activeChatUser.data.messages.length === 0 && (
								<div className="text-sm flex items-center justify-center text-center h-full text-stone-300">No messages here yet...</div>
							)}
							<div ref={messageRef}></div>
						</div>
					</div>

					{/* Chat Send Button */}
					<form onSubmit={handleSubmit} className="flex gap-4">
						<textarea
							name="message"
							value={text}
							placeholder="Message"
							onChange={(e) => setText(e.target.value)}
							className="font-light flex-1 p-2 border rounded-sm outline-0 placeholder-color"
						></textarea>
						<button className="group px-4 border rounded-sm cursor-pointer text-sky-300">
							<IoIosSend className="size-7 group-hover:scale-110 transition-all" />
						</button>
					</form>
				</>
			) : (
				<div className="text-sm flex items-center justify-center h-full text-stone-300">Select a chat to start messaging!</div>
			)}
		</div>
	);
}
