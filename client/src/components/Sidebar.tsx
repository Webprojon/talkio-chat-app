import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

interface Chats {
	id: number;
	username: string;
	lastMessage: string;
}

export default function Sidebar() {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [chats, setChats] = useState<Chats[]>([]);

	const staticChats: Chats[] = [
		{
			id: 1,
			username: "John Doe",
			lastMessage: "Hi John",
		},
		{
			id: 2,
			username: "Alex",
			lastMessage: "How are you doing?",
		},
	];

	const searchChats = searchTerm ? staticChats.filter((chat) => chat.username.toLowerCase().includes(searchTerm.toLowerCase())) : [];

	const handleSelectChat = (chat: Chats) => {
		if (!chats.some((c) => c.id === chat.id)) {
			setChats((prev) => [...prev, chat]);
		}
		setSearchTerm("");
	};

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
					{searchChats.map((chat) => (
						<div
							key={chat.id}
							onClick={() => handleSelectChat(chat)}
							className="flex items-center gap-3 rounded-sm px-2 py-3 sm:p-2 cursor-pointer transition-all bg-[#2e323b] hover:bg-[#2a2e38]"
						>
							<img src="./noavatar.png" alt="user img" className="w-9 h-9 rounded-full object-cover border" />
							<div className="flex flex-col gap-1">
								<span className="sm:text-sm font-medium">{chat.username}</span>
								<p className="text-sm sm:text-xs text-stone-400">{chat.lastMessage}</p>
							</div>
						</div>
					))}

					{searchChats.length === 0 && <div className="mt-4 text-center text-xs text-stone-300">No matching user found!</div>}
				</div>
			)}

			{chats.map(({ id, username, lastMessage }) => (
				<div key={id} className="flex items-center gap-3 rounded-sm px-2 py-3 sm:p-2 cursor-pointer transition-all bg-[#252932] hover:bg-[#2a2e38]">
					<img src="./noavatar.png" alt="user img" className="w-9 h-9 rounded-full object-cover border" />
					<div className="flex flex-col gap-1">
						<span className="sm:text-sm font-medium">{username}</span>
						<p className="text-sm sm:text-xs text-stone-400">{lastMessage}</p>
					</div>
				</div>
			))}

			{searchChats.length === 0 && chats.length === 0 && (
				<div className="mt-4 text-center text-xs text-stone-300">No chats yet, search for a friend to start a conversation!</div>
			)}
		</div>
	);
}
