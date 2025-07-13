import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { apiRequest } from "../lib/apiRequest";
import useChatUserStore from "../store/chatUser";
import type { ChatUser, UserChat } from "../lib/types";

export default function Sidebar() {
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [userChats, setUserChats] = useState<UserChat[]>([]);
	const [allUsers, setAllUsers] = useState<ChatUser[]>([]);
	const { setActiveChatUser } = useChatUserStore();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [chatsRes, usersRes] = await Promise.all([apiRequest("/chats", { withCredentials: true }), apiRequest("/users")]);
				setUserChats(chatsRes.data.data);
				setAllUsers(usersRes.data.data);
			} catch (err) {
				console.log(err);
			}
		};

		fetchData();
	}, []);

	const openChatHandler = async (id: string, receiver: ChatUser) => {
		try {
			const res = await apiRequest(`/chats/${id}`, { withCredentials: true });
			setActiveChatUser({ ...res.data, receiver });
		} catch (err) {
			console.log(err);
		}
	};

	const startNewChatHandler = async (userId: string) => {
		try {
			await apiRequest.post("/chats", { receiverId: userId }, { withCredentials: true });
		} catch (err) {
			console.log(err);
		}
	};

	const filteredUsers = searchQuery ? allUsers.filter((user) => user.username.toLowerCase().includes(searchQuery.toLowerCase())) : [];

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

			{searchQuery && (
				<div className="absolute top-[9%] left-0 bg-[#1d222e] w-full h-[91%] sm:p-3">
					{filteredUsers.map((user) => (
						<div
							key={user.id}
							onClick={() => startNewChatHandler(user.id)}
							className="flex items-center gap-3 rounded-sm px-2 py-3 sm:p-2 cursor-pointer transition-all bg-[#2e323b] hover:bg-[#2a2e38]"
						>
							<img src={user.avatar || "./noavatar.png"} alt="user img" className="w-9 h-9 rounded-full object-cover border" />
							<div className="flex flex-col gap-1">
								<span className="sm:text-sm font-medium">{user.username}</span>
							</div>
						</div>
					))}

					{filteredUsers.length === 0 && <div className="mt-4 text-center text-xs text-stone-300">No matching user found!</div>}
				</div>
			)}

			{userChats.map((chat) => (
				<div
					key={chat.id}
					onClick={() => openChatHandler(chat.id, chat.receiver)}
					className="flex items-center gap-3 rounded-sm px-2 py-3 sm:p-2 cursor-pointer transition-all bg-[#252932] hover:bg-[#2a2e38]"
				>
					<img src={chat.receiver.avatar || "./noavatar.png"} alt="user img" className="w-9 h-9 rounded-full object-cover border" />
					<div className="flex flex-col gap-1">
						<span className="sm:text-sm font-medium">{chat.receiver.username}</span>
						<p className="text-sm sm:text-xs text-stone-400">{chat.lastMessage}</p>
					</div>
				</div>
			))}

			{filteredUsers.length === 0 && userChats.length === 0 && (
				<div className="mt-4 text-center text-xs text-stone-300">No chats yet, search for a friend to start a conversation!</div>
			)}
		</div>
	);
}
