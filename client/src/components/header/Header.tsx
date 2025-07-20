import { useCurrentUser } from "../../hooks/useCurrentUser";
import useChatUserStore from "../../store/chatUser";
import DropdownMenu from "./Dropdown";

export default function Header() {
	const { currentUser } = useCurrentUser();
	const { activeChatUser } = useChatUserStore();

	return (
		<div className={`relative justify-between items-center border-b p-4 sm:p-2 rounded-t-md bg-[#1C2029] ${activeChatUser ? "hidden sm:flex" : "flex"}`}>
			<div className="flex-center gap-3">
				<img src={currentUser?.avatar || "./noavatar.png"} alt="user img" className="w-11 h-11 rounded-full object-cover border" />
				<span className="text-lg font-medium">{currentUser?.username}</span>
			</div>
			<DropdownMenu />
		</div>
	);
}
