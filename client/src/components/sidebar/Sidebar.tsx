import { useState } from "react";
import { apiRequest } from "../../lib/apiRequest";
import useChatUserStore from "../../store/chatUser";
import type { ChatUser, UserChat } from "../../lib/types";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PulseLoader } from "react-spinners";
import SearchUserInput from "./SearchUserInput";
import ChatUserItem from "./ChatUserItem";
import UserChatsList from "./UserChatsList";
import UserListModal from "./UserListModal";

export default function Sidebar() {
	const [searchQuery, setSearchQuery] = useState<string>("");
	const { setActiveChatUser } = useChatUserStore();
	const { currentUser } = useCurrentUser();
	const queryClient = useQueryClient();

	// All users
	const { data: allUsers = [] } = useQuery({
		queryKey: ["users"],
		queryFn: async () => {
			const res = await apiRequest("/users");
			return res.data.data as ChatUser[];
		},
	});

	// User chats
	const { data: userChats = [], isLoading } = useQuery({
		queryKey: ["chats"],
		queryFn: async () => {
			await new Promise((resolve) => setTimeout(resolve, 800));
			const res = await apiRequest("/chats", { withCredentials: true });
			return res.data.data as UserChat[];
		},
	});

	// Start new chat mutation
	const startNewChat = useMutation({
		mutationFn: async (userId: string) => {
			const res = await apiRequest.post("/chats", { receiverId: userId }, { withCredentials: true });
			return res.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["chats"] });
			setSearchQuery("");
		},
	});

	const openChatHandler = async (chatId: string, receiver: ChatUser) => {
		try {
			const res = await apiRequest(`/chats/${chatId}`, { withCredentials: true });
			setActiveChatUser({ ...res.data, receiver });
		} catch (err) {
			console.log(err);
		}
	};

	const filteredUsers = searchQuery
		? allUsers.filter((user) => {
				if (currentUser.id === user.id) return false;
				return user.username.toLowerCase().includes(searchQuery.toLowerCase());
		  })
		: [];

	const users = allUsers.filter((user) => user.id !== currentUser.id);

	return (
		<div className="relative flex flex-col gap-4 sm:gap-2 flex-1 rounded-b-md border-r border-b p-3 bg-[#1C2029]">
			{/* Search input */}
			<SearchUserInput value={searchQuery} onChange={setSearchQuery} />

			{/* Searched users */}
			{searchQuery && (
				<div className="flex flex-col gap-2 absolute top-[9%] left-0 bg-[#212632] w-full h-[91%] sm:p-3 z-10">
					{filteredUsers.map((user) => (
						<ChatUserItem key={user.id} user={user} onClick={() => startNewChat.mutate(user.id)} />
					))}

					{filteredUsers.length === 0 && <div className="mt-4 text-center text-xs text-stone-300">No matching user found!</div>}
				</div>
			)}

			{/* User chats */}
			<UserChatsList chats={userChats} onChatClick={openChatHandler} />

			{/* Add User */}
			<UserListModal users={users} onStartChat={(id) => startNewChat.mutate(id)} />

			{/* Loading indicator */}
			{isLoading && (
				<div className="self-center mt-2">
					<PulseLoader color="#71D0FC" size={7} speedMultiplier={0.7} />
				</div>
			)}
			{!isLoading && filteredUsers.length === 0 && userChats.length === 0 && (
				<div className="mt-4 text-center text-xs text-stone-300">No chats yet, search for a friend to start a conversation!</div>
			)}
		</div>
	);
}
