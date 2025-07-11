import useChatUser from "../store/chatUser";
import Messages from "./Messages";
import SendMessage from "./SendMessage";

export default function Chat() {
	const { user } = useChatUser();

	return (
		<div className="flex-col gap-4 flex-2 px-4 py-2 hidden sm:flex">
			{user ? (
				<>
					<div className="flex items-center gap-3 border-b pb-2">
						<img src="./noavatar.png" alt="user img" className="w-9 h-9 rounded-full object-cover border" />
						<div className="flex flex-col">
							<span className="text-sm font-medium">{user?.username}</span>
							<p className="text-xs text-stone-400">last seen recently</p>
						</div>
					</div>
					<Messages />
					<SendMessage />
				</>
			) : (
				<div className="text-sm flex items-center justify-center h-full text-stone-300">Start a new conversation!</div>
			)}
		</div>
	);
}
