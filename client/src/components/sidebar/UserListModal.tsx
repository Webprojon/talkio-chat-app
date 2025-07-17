import { IoMdClose } from "react-icons/io";
import type { ChatUser } from "../../lib/types";
import ChatUserItem from "./ChatUserItem";
import { RiUserAddLine } from "react-icons/ri";
import { useState } from "react";

interface UserListModalProps {
	users: ChatUser[];
}

export default function UserListModal({ users }: UserListModalProps) {
	const [isOpen, setIsOpen] = useState(false);

	const toggleContact = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<>
			<button
				onClick={toggleContact}
				className="absolute bottom-2 right-2 w-10 h-10 rounded-full flex-center border cursor-pointer hover:scale-105 transition-all"
			>
				{isOpen ? <IoMdClose className="size-5" /> : <RiUserAddLine className="size-5" />}
			</button>

			{isOpen && (
				<div onClick={toggleContact} className="absolute top-0 -right-[90%] border-l flex flex-col gap-2 w-[90%] h-full sm:p-3 z-10 bg-[#1C2029]">
					{users.map((user) => (
						<ChatUserItem key={user.id} user={user} />
					))}
				</div>
			)}
		</>
	);
}
