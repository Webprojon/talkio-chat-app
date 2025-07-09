import { HiOutlineDotsVertical } from "react-icons/hi";
import useUserStore from "../store/userStore";
import { PiPaintBrushHousehold } from "react-icons/pi";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaPowerOff } from "react-icons/fa6";
import { useState } from "react";
import type { AxiosError } from "axios";
import { apiRequest } from "../lib/apiRequest";
import { useNavigate } from "react-router-dom";

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const { user } = useUserStore.getState();
	const navigate = useNavigate();

	const handleToggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const handleLogout = async () => {
		navigate("/sign-in");
		localStorage.removeItem("user");
		try {
			await apiRequest.post("/auth/sign-out", {}, { withCredentials: true });
		} catch (err) {
			const error = err as AxiosError<{ message: string }>;
			console.log(error.response?.data?.message || "Something went wrong");
		}
	};

	const DROPDOWN_ITEMS = [
		{
			id: 1,
			label: "Clear History",
			icon: <PiPaintBrushHousehold className="text-sky-300" />,
			onClick: undefined,
		},
		{
			id: 2,
			label: "Delete Chat",
			icon: <RiDeleteBinLine className="text-sky-300" />,
			onClick: undefined,
		},
		{
			id: 3,
			label: "Log out",
			icon: <FaPowerOff className="text-sky-300" />,
			onClick: handleLogout,
		},
		{
			id: 4,
			label: "Delete Account",
			icon: <RiDeleteBinLine className="text-sky-300" />,
			onClick: undefined,
		},
	];

	return (
		<div className="relative flex justify-between items-center border-b p-4 sm:p-2 rounded-t-md bg-[#1C2029]">
			<div className="flex-center gap-3">
				<img src={user?.avatar || "./noavatar.png"} alt="user img" className="w-10 h-10 rounded-full object-cover border" />
				<span className="text-lg font-medium">{user?.username}</span>
			</div>
			<HiOutlineDotsVertical onClick={handleToggleMenu} className="size-5 cursor-pointer" />
			{isOpen && (
				<div className="flex flex-col items-start gap-y-5 text-sm absolute top-10 right-4 p-3 border rounded-md z-[400] bg-[#1C2029]">
					{DROPDOWN_ITEMS.map(({ id, icon, label, onClick }) => (
						<div key={id} className="flex items-center gap-x-3 cursor-pointer hover:text-slate-300" onClick={onClick}>
							{icon}
							{label}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
