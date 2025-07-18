import type { Receiver } from "../../lib/types";

export default function ChatHeader({ receiver }: { receiver: Receiver }) {
	return (
		<div className="flex items-center gap-3 border-b pb-2">
			<img src={receiver.avatar || "./noavatar.png"} alt="user img" className="w-9 h-9 rounded-full object-cover border" />
			<div className="flex flex-col">
				<span className="text-sm font-medium">{receiver.username}</span>
				<p className="text-xs text-stone-400">last seen recently</p>
			</div>
		</div>
	);
}
