import { HiOutlineDotsVertical } from "react-icons/hi";
import useUserStore from "../store/userStore";

export default function Header() {
	const { user } = useUserStore.getState();

	return (
		<div className="flex justify-between items-center border-b p-4 sm:p-2 rounded-t-md bg-[#1C2029]">
			<div className="flex-center gap-3">
				<img src={user?.avatar || "./noavatar.png"} alt="user img" className="w-10 h-10 rounded-full object-cover border" />
				<span className="text-lg font-medium">{user?.username}</span>
			</div>
			<HiOutlineDotsVertical className="size-5 cursor-pointer" />
		</div>
	);
}
