import { useEffect, useState } from "react";
import type { ActiveChatUser, Messages } from "../../lib/types";
import useChatUserStore from "../../store/chatUser";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useChatSocket } from "../../hooks/useChatSocket";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatSendForm from "./ChatSendForm";

export default function Chat() {
	const { currentUser } = useCurrentUser();
	const [messages, setMessages] = useState<Messages["messages"]>([]);
	const { activeChatUser } = useChatUserStore() as { activeChatUser: ActiveChatUser | null };
	const activeChatUserMessages = activeChatUser?.data?.messages;

	useChatSocket(currentUser?.id, (data) => {
		setMessages((prev) => [...prev, data]);
	});

	useEffect(() => {
		if (activeChatUserMessages) {
			setMessages(activeChatUserMessages);
		}
	}, [activeChatUserMessages]);

	return (
		<div className="flex-col gap-4 justify-between flex-2 px-4 py-2 hidden sm:flex">
			{activeChatUser ? (
				<>
					<ChatHeader receiver={activeChatUser?.receiver} />
					<div className="h-105">
						<ChatMessages messages={messages} />
					</div>
					<ChatSendForm setMessages={setMessages} />
				</>
			) : (
				<div className="text-sm flex items-center justify-center h-full text-stone-300">Select a chat to start messaging!</div>
			)}
		</div>
	);
}
