import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { apiRequest } from "../lib/apiRequest";
import useChatUserStore from "../store/chatUser";
import type { ChatUser, UserChat } from "../lib/types";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PulseLoader } from "react-spinners";

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

	return (
		<div className="relative flex flex-col gap-4 sm:gap-2 flex-1 rounded-b-md border-r border-b p-3 bg-[#1C2029]">
			<div className="flex items-center gap-2 py-2 px-1 mb-2 border-b">
				<IoSearchOutline className="size-6 sm:size-5" />
				<input
					type="text"
					name="search"
					id="search"
					autoComplete="off"
					value={searchQuery}
					placeholder="Search"
					className="w-full outline-none placeholder-color text-sm"
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</div>

			{/* Filtered users (search mode) */}
			{searchQuery && (
				<div className="flex flex-col gap-2 absolute top-[9%] left-0 bg-[#212632] w-full h-[91%] sm:p-3 z-10">
					{filteredUsers.map(({ id, avatar, username }) => (
						<div
							key={id}
							onClick={() => startNewChat.mutate(id)}
							className="flex items-center gap-3 rounded-sm px-2 py-3 sm:p-2 cursor-pointer transition-all bg-[#2e323b] hover:bg-[#2a2e38]"
						>
							<img src={avatar || "./noavatar.png"} alt="user img" className="w-9 h-9 rounded-full object-cover border" />
							<div className="flex flex-col gap-1">
								<span className="sm:text-sm font-medium">{username}</span>
							</div>
						</div>
					))}

					{filteredUsers.length === 0 && <div className="mt-4 text-center text-xs text-stone-300">No matching user found!</div>}
				</div>
			)}

			{/* User chats */}
			{userChats.map(({ id, receiver, lastMessage }) => (
				<div
					key={id}
					onClick={() => openChatHandler(id, receiver)}
					className="flex items-center gap-3 rounded-sm px-2 py-3 sm:p-2 cursor-pointer transition-all bg-[#252932] hover:bg-[#2a2e38]"
				>
					<img src={receiver.avatar || "./noavatar.png"} alt="user img" className="w-9 h-9 rounded-full object-cover border" />
					<div className="flex flex-col gap-1">
						<span className="sm:text-sm font-medium">{receiver.username}</span>
						<p className="text-sm sm:text-xs text-stone-400">{lastMessage}</p>
					</div>
				</div>
			))}

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
