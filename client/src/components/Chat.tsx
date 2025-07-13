import type { ActiveChatUser } from "../lib/types";
import useChatUserStore from "../store/chatUser";
import Messages from "./Messages";
import SendMessage from "./SendMessage";

export default function Chat() {
	const { activeChatUser } = useChatUserStore() as { activeChatUser: ActiveChatUser | null };

	return (
		<div className="flex-col gap-4 flex-2 px-4 py-2 hidden sm:flex">
			{activeChatUser ? (
				<>
					<div className="flex items-center gap-3 border-b pb-2">
						<img src={activeChatUser?.receiver.avatar || "./noavatar.png"} alt="user img" className="w-9 h-9 rounded-full object-cover border" />
						<div className="flex flex-col">
							<span className="text-sm font-medium">{activeChatUser?.receiver.username}</span>
							<p className="text-xs text-stone-400">last seen recently</p>
						</div>
					</div>
					<Messages messages={activeChatUser.data.messages} />
					<SendMessage />
				</>
			) : (
				<div className="text-sm flex items-center justify-center h-full text-stone-300">Select a chat to start messaging!</div>
			)}
		</div>
	);
}
