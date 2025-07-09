import { HiOutlineDotsVertical } from "react-icons/hi";
import { PiPaintBrushHousehold } from "react-icons/pi";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaPowerOff } from "react-icons/fa6";
import { useState } from "react";
import { apiRequest } from "../lib/apiRequest";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useMutation } from "@tanstack/react-query";

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();
	const { currentUser } = useCurrentUser();

	const handleToggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const logout = useMutation({
		mutationFn: async () => {
			await apiRequest.post("/auth/sign-out");
		},
		onSuccess: () => {
			navigate("/sign-in");
		},
		onError: (error) => {
			console.log(error.message || "Something went wrong");
		},
	});

	const handleLogout = (e?: React.MouseEvent) => {
		e?.preventDefault();
		logout.mutate();
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
				<img src={currentUser?.avatar || "./noavatar.png"} alt="user img" className="w-10 h-10 rounded-full object-cover border" />
				<span className="text-lg font-medium">{currentUser?.username}</span>
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
