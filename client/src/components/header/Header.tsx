import { useCurrentUser } from "../../hooks/useCurrentUser";
import useChatUserStore from "../../store/chatUser";
import DropdownMenu from "./Dropdown";
import { MdArrowBack } from "react-icons/md";

export default function Header() {
	const { currentUser } = useCurrentUser();
	const { setIsChatOpen } = useChatUserStore();
	const { setActiveChatUser, activeChatUser } = useChatUserStore();

	return (
		<div className="relative flex justify-between items-center border-b p-4 sm:p-2 rounded-t-md bg-[#1C2029]">
			<div className="flex-center gap-3">
				<MdArrowBack
					onClick={() => {
						setIsChatOpen(false);
						setActiveChatUser(null);
					}}
					className={`sm:hidden size-8 mr-4 ${!activeChatUser && "hidden"}`}
				/>
				<img src={currentUser?.avatar || "./noavatar.png"} alt="user img" className="w-11 h-11 rounded-full object-cover border" />
				<span className="text-lg font-medium">{currentUser?.username}</span>
			</div>
			<DropdownMenu />
		</div>
	);
}
