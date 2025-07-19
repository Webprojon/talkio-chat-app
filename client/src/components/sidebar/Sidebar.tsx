import { useState } from "react";
import { apiRequest } from "../../lib/apiRequest";
import type { ChatUser, UserChat } from "../../lib/types";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useQuery } from "@tanstack/react-query";
import { PulseLoader } from "react-spinners";
import SearchUserInput from "./SearchUserInput";
import ChatUserItem from "./ChatUserItem";
import UserChatsList from "./UserChatsList";
import UserListModal from "./UserListModal";

export default function Sidebar() {
	const [searchQuery, setSearchQuery] = useState<string>("");
	const { currentUser } = useCurrentUser();

	const { data: allUsers = [] } = useQuery({
		queryKey: ["users"],
		queryFn: async () => {
			const res = await apiRequest("/users");
			return res.data.data as ChatUser[];
		},
	});

	const { data: userChats = [], isLoading } = useQuery({
		queryKey: ["chats"],
		queryFn: async () => {
			await new Promise((resolve) => setTimeout(resolve, 800));
			const res = await apiRequest("/chats", { withCredentials: true });
			return res.data.data as UserChat[];
		},
	});

	const otherUsers = allUsers.filter((user) => user.id !== currentUser.id);

	const filteredUsers = searchQuery ? otherUsers.filter((user) => user.username.toLowerCase().includes(searchQuery.toLowerCase())) : [];

	return (
		<div className="relative flex flex-col gap-4 sm:gap-2 flex-1 rounded-b-md border-r border-b p-3 bg-[#1C2029]">
			<SearchUserInput value={searchQuery} onChange={setSearchQuery} />

			{searchQuery && (
				<div className="flex flex-col gap-3 absolute top-12 rounded-b-md left-0 w-full h-[91.6%] p-3 z-10 bg-[#212632]">
					{filteredUsers.map((user) => (
						<ChatUserItem key={user.id} user={user} setSearch={setSearchQuery} />
					))}

					{filteredUsers.length === 0 && <div className="mt-4 text-center text-xs text-stone-300">No matching user found!</div>}
				</div>
			)}

			<UserChatsList chats={userChats} />
			<UserListModal users={otherUsers} />

			{isLoading && (
				<div className="absolute inset-0 flex-center z-10">
					<PulseLoader color="#71D0FC" size={7} speedMultiplier={0.7} />
				</div>
			)}

			{!isLoading && !searchQuery && userChats.length === 0 && (
				<div className="mt-4 text-center text-xs text-stone-300">No chats yet, search for a friend to start a conversation!</div>
			)}
		</div>
	);
}
