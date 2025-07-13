import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import useChatUser from "../store/chatUser";
import { apiRequest } from "../lib/apiRequest";

interface Chats {
	id: number;
	username: string;
	avatar: string;
}

export default function Sidebar() {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [chats, setChats] = useState<Chats[]>([]);
	const [users, setUsers] = useState<Chats[]>([]);
	const { setUser } = useChatUser();

	const fetchUsers = async () => {
		try {
			const res = await apiRequest("/users");
			setUsers(res.data.data);
		} catch (err) {
			console.log(err);
		}
	};

	const fetchChats = async () => {
		try {
			const res = await apiRequest("/chats", { withCredentials: true });
			console.log(res.data.data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchChats();
		fetchUsers();
	}, []);

	const foundedUsers = searchTerm ? users.filter((chat) => chat.username.toLowerCase().includes(searchTerm.toLowerCase())) : [];

	const handleSelectChat = (chat: Chats) => {
		if (!chats.some((c) => c.id === chat.id)) {
			setChats((prev) => [...prev, chat]);
		}
		setSearchTerm("");
		handleSendChatUser(chat);
	};

	const handleSendChatUser = (user: Chats) => {
		setUser(user);
	};

	//const handleOpenChat = async (id, receiver) => {
	//	try {
	//		const res = await apiRequest(`/chats/${id}`, { withCredentials: true });
	//		setChat({ ...res.data, receiver });
	//	} catch (err) {
	//		console.log(err);
	//	}
	//};

	return (
		<div className="relative flex flex-col gap-4 sm:gap-2 flex-1 rounded-b-md border-r border-b p-3 bg-[#1C2029]">
			<div className="flex items-center gap-2 py-2 px-1 mb-2 border-b">
				<IoSearchOutline className="size-6 sm:size-5" />
				<input
					type="text"
					name="search"
					id="search"
					autoComplete="off"
					value={searchTerm}
					placeholder="Search"
					className="w-full outline-none placeholder-color text-sm"
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>

			{searchTerm && (
				<div className="absolute top-[9%] left-0 bg-[#1d222e] w-full h-[91%] sm:p-3">
					{foundedUsers.map((user) => (
						<div
							key={user.id}
							onClick={() => handleSelectChat(user)}
							className="flex items-center gap-3 rounded-sm px-2 py-3 sm:p-2 cursor-pointer transition-all bg-[#2e323b] hover:bg-[#2a2e38]"
						>
							<img src={user.avatar || "./noavatar.png"} alt="user img" className="w-9 h-9 rounded-full object-cover border" />
							<div className="flex flex-col gap-1">
								<span className="sm:text-sm font-medium">{user.username}</span>
								{/*<p className="text-sm sm:text-xs text-stone-400">{user.lastMessage}</p>*/}
							</div>
						</div>
					))}

					{foundedUsers.length === 0 && <div className="mt-4 text-center text-xs text-stone-300">No matching user found!</div>}
				</div>
			)}

			{chats.map((chat) => (
				<div
					key={chat.id}
					onClick={() => handleOpenChat}
					className="flex items-center gap-3 rounded-sm px-2 py-3 sm:p-2 cursor-pointer transition-all bg-[#252932] hover:bg-[#2a2e38]"
				>
					<img src={chat.avatar || "./noavatar.png"} alt="user img" className="w-9 h-9 rounded-full object-cover border" />
					<div className="flex flex-col gap-1">
						<span className="sm:text-sm font-medium">{chat.username}</span>
						{/*<p className="text-sm sm:text-xs text-stone-400">{chat.lastMessage}</p>*/}
					</div>
				</div>
			))}

			{foundedUsers.length === 0 && chats.length === 0 && (
				<div className="mt-4 text-center text-xs text-stone-300">No chats yet, search for a friend to start a conversation!</div>
			)}
		</div>
	);
}
