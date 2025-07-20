import { MdKeyboardArrowLeft } from "react-icons/md";
import type { Receiver } from "../../lib/types";
import useChatUserStore from "../../store/chatUser";
import DropdownMenu from "../header/Dropdown";

export default function ChatHeader({ receiver }: { receiver: Receiver }) {
	const { setIsChatOpen } = useChatUserStore();
	const { setActiveChatUser, activeChatUser } = useChatUserStore();

	const handleBack = () => {
		setIsChatOpen(false);
		setActiveChatUser(null);
	};

	return (
		<div className="flex justify-between items-center border-b relative">
			<div className="flex items-center gap-3 px-2 py-2 sm:px-0">
				<MdKeyboardArrowLeft onClick={handleBack} className={`sm:hidden size-9 ${!activeChatUser && "hidden"}`} />
				<img src={receiver.avatar || "./noavatar.png"} alt="user img" className="w-11 h-11 sm:w-9 sm:h-9 rounded-full object-cover border" />
				<div className="flex flex-col">
					<span className="sm:text-sm font-medium">{receiver.username}</span>
					<p className="text-sm sm:text-xs text-stone-400">last seen recently</p>
				</div>
			</div>
			<div className="flex sm:hidden">
				<DropdownMenu />
			</div>
		</div>
	);
}
