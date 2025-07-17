import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ChatUser } from "../../lib/types";
import { apiRequest } from "../../lib/apiRequest";

interface ChatUserItemProps {
	user: ChatUser;
	setSearch?: (value: string) => void;
}

export default function ChatUserItem({ user, setSearch }: ChatUserItemProps) {
	const queryClient = useQueryClient();

	const startNewChat = useMutation({
		mutationFn: async (userId: string) => {
			const res = await apiRequest.post("/chats", { receiverId: userId }, { withCredentials: true });
			return res.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["chats"] });
			setSearch?.("");
		},
	});

	return (
		<div
			onClick={() => startNewChat.mutate(user.id)}
			className="flex items-center gap-3 rounded-sm px-2 py-[6px] cursor-pointer transition-all bg-[#2e323b] hover:bg-[#2a2e38]"
		>
			<img src={user.avatar || "./noavatar.png"} alt={`${user.username}'s avatar`} className="w-9 h-9 rounded-full object-cover border" />
			<div className="flex flex-col gap-1">
				<span className="sm:text-sm font-medium">{user.username}</span>
			</div>
		</div>
	);
}
