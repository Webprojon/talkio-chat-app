import type { ChatUser } from "../../lib/types";

interface ChatUserItemProps {
	user: ChatUser;
	onClick: () => void;
}

export default function ChatUserItem({ user, onClick }: ChatUserItemProps) {
	return (
		<div onClick={onClick} className="flex items-center gap-3 rounded-sm px-2 py-3 sm:p-2 cursor-pointer transition-all bg-[#2e323b] hover:bg-[#2a2e38]">
			<img src={user.avatar || "./noavatar.png"} alt={`${user.username}'s avatar`} className="w-9 h-9 rounded-full object-cover border" />
			<div className="flex flex-col gap-1">
				<span className="sm:text-sm font-medium">{user.username}</span>
			</div>
		</div>
	);
}
