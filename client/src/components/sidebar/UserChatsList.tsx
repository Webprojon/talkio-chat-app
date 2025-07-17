import type { UserChat } from "../../lib/types";

interface UserChatsListProps {
	chats: UserChat[];
	onChatClick: (chatId: string, receiver: UserChat["receiver"]) => void;
}

export default function UserChatsList({ chats, onChatClick }: UserChatsListProps) {
	return (
		<>
			{chats.map(({ id, receiver, lastMessage }) => (
				<div
					key={id}
					onClick={() => onChatClick(id, receiver)}
					className="flex items-center gap-3 rounded-sm px-2 py-3 sm:p-2 cursor-pointer transition-all bg-[#252932] hover:bg-[#2a2e38]"
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
