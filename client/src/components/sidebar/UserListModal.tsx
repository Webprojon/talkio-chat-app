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
			{isOpen ? (
				<div
					onClick={toggleContact}
					className="absolute bottom-16 top-5 flex flex-col gap-2 w-[95%] h-[90vh] p-2 z-10 sm:top-0 sm:-right-[90.2%] sm:w-[90%] sm:h-full bg-[#1C2029]"
				>
					<div className="mb-4 sm:mb-2 flex items-center justify-between">
						<h2 className="text-lg font-medium sm:font-normal sm:text-[15px]">Contacts</h2>
						<IoMdClose className="size-6 sm:size-5 cursor-pointer" />
					</div>
					<div className="flex flex-col gap-4 sm:gap-2">
						{users.map((user) => (
							<ChatUserItem key={user.id} user={user} />
						))}
					</div>
				</div>
			) : (
				<button
					onClick={toggleContact}
					className="absolute bottom-2 right-2 w-10 h-10 rounded-full flex-center border cursor-pointer hover:scale-105 transition-all"
				>
					<RiUserAddLine className="size-5" />
				</button>
			)}
		</>
	);
}
