import { apiRequest } from "../../lib/apiRequest";
import type { ChatUser, UserChat } from "../../lib/types";
import useChatUserStore from "../../store/chatUser";

interface UserChatsListProps {
	chats: UserChat[];
}

export default function UserChatsList({ chats }: UserChatsListProps) {
	const { setActiveChatUser } = useChatUserStore();

	const openChatHandler = async (chatId: string, receiver: ChatUser) => {
		try {
			const res = await apiRequest(`/chats/${chatId}`, { withCredentials: true });
			setActiveChatUser({ ...res.data, receiver });
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			{chats.map(({ id, receiver, lastMessage }) => (
				<div
					key={id}
					onClick={() => openChatHandler(id, receiver)}
					className="flex items-center gap-3 rounded-sm px-2 py-[6px] cursor-pointer transition-all bg-[#252932] hover:bg-[#2a2e38]"
				>
					<img src={receiver.avatar || "./noavatar.png"} alt={`${receiver.username}'s avatar`} className="w-9 h-9 rounded-full object-cover border" />
					<div className="flex flex-col gap-1">
						<span className="sm:text-sm font-medium">{receiver.username}</span>
						<p className="text-sm sm:text-xs text-stone-400">{lastMessage}</p>
					</div>
				</div>
			))}
		</>
	);
}
