import { useCurrentUser } from "../../hooks/useCurrentUser";
import DropdownMenu from "./Dropdown";

export default function Header() {
	const { currentUser } = useCurrentUser();

	return (
		<div className="relative flex justify-between items-center border-b p-4 sm:p-2 rounded-t-md bg-[#1C2029]">
			<div className="flex-center gap-3">
				<img src={currentUser?.avatar || "./noavatar.png"} alt="user img" className="w-11 h-11 rounded-full object-cover border" />
				<span className="text-lg font-medium">{currentUser?.username}</span>
			</div>
			<DropdownMenu />
		</div>
	);
}
