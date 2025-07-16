import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { FaPowerOff } from "react-icons/fa6";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { PiPaintBrushHouseholdDuotone } from "react-icons/pi";
import { RiDeleteBinLine } from "react-icons/ri";
import { apiRequest } from "../../lib/apiRequest";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useNavigate } from "react-router-dom";
import useChatUserStore from "../../store/chatUser";

export default function DropdownMenu() {
	const { activeChatUser, setActiveChatUser } = useChatUserStore();
	const currentChatId = activeChatUser?.data?.id;
	const [isOpen, setIsOpen] = useState(false);
	const { currentUser } = useCurrentUser();
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (!(e.target as HTMLElement).closest(".dropdown-menu")) {
				setIsOpen(false);
			}
		};
		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	}, []);

	const logout = useMutation({
		mutationFn: async () => {
			await apiRequest.post("/auth/sign-out");
		},
		onSuccess: () => {
			navigate("/");
		},
		onError: (error) => {
			console.log(error.message || "Something went wrong");
		},
	});

	const deleteChat = useMutation({
		mutationFn: async () => {
			await apiRequest.delete(`/chats/${currentChatId}`, { withCredentials: true });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["chats"] });
			setActiveChatUser(null);
		},
		onError: (error) => {
			console.log(error.message || "Something went wrong");
		},
	});

	const clearHistory = useMutation({
		mutationFn: async () => {
			await apiRequest.delete(`chats/clear/${currentChatId}`, { withCredentials: true });
		},
		onSuccess: () => {
			setActiveChatUser(null);
		},
		onError: (error) => {
			console.log(error.message || "Something went wrong");
		},
	});

	const deleteAccount = useMutation({
		mutationFn: async () => {
			await apiRequest.delete(`/users/${currentUser.id}`);
		},
		onSuccess: () => {
			//queryClient.invalidateQueries({ queryKey: ["chats"] });
			navigate("/");
		},
		onError: (error) => {
			console.log(error.message || "Something went wrong");
		},
	});

	const ITEMS = useMemo(
		() => [
			{
				id: 1,
				label: "Log out",
				icon: <FaPowerOff className="text-sky-300" />,
				onClick: () => logout.mutate(),
			},
			{
				id: 2,
				label: "Delete chat",
				icon: <RiDeleteBinLine className="text-sky-300" />,
				onClick: () => deleteChat.mutate(),
			},
			{
				id: 3,
				label: "Clear history",
				icon: <PiPaintBrushHouseholdDuotone className="text-sky-300" />,
				onClick: () => clearHistory.mutate(),
			},
			{
				id: 4,
				label: "Delete account",
				icon: <RiDeleteBinLine className="text-sky-300" />,
				onClick: () => deleteAccount.mutate(),
			},
		],
		[logout, deleteChat, clearHistory, deleteAccount],
	);

	const FILTERED_ITEMS = useMemo(() => {
		return activeChatUser ? ITEMS : ITEMS.filter((item) => item.label === "Log out" || item.label === "Delete account");
	}, [activeChatUser, ITEMS]);

	return (
		<div className="dropdown-menu">
			<HiOutlineDotsVertical onClick={() => setIsOpen(true)} className="size-5 cursor-pointer" />
			{isOpen && (
				<div className="flex flex-col items-start gap-y-5 text-sm absolute top-10 right-4 p-3 border rounded-md z-[400] bg-[#1C2029]">
					{FILTERED_ITEMS.map(({ id, icon, label, onClick }) => (
						<div
							key={id}
							className="flex items-center gap-x-3 cursor-pointer hover:text-slate-400"
							onClick={() => {
								onClick();
								setIsOpen(false);
							}}
						>
							{icon}
							{label}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
