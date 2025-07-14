import { useCurrentUser } from "../hooks/useCurrentUser";
import { format } from "timeago.js";
import type { Message } from "../lib/types";
import { useEffect, useRef } from "react";

export default function Messages({ messages }: { messages: Message[] }) {
	const messageRef = useRef<HTMLDivElement | null>(null);
	const { currentUser } = useCurrentUser();

	useEffect(() => {
		messageRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	return (
		<div className="flex flex-col gap-5 flex-[2] w-full h-full overflow-y-scroll noscrollbar">
			{messages.map(({ id, createdAt, text, userId }) => (
				<div key={id} className={`flex gap-3 max-w-[55%] sm:max-w-[50%] ${userId === currentUser.id ? "self-end" : "flex-row-reverse self-start"}`}>
					<div className="px-2 py-1 rounded-sm bg-[#252932]">
						<p className="text-sm font-light">{text}</p>
						<span className="pt-1 text-xs font-light text-stone-400">{format(createdAt)}</span>
					</div>
				</div>
			))}
			{messages.length === 0 && <div className="text-sm flex items-center justify-center text-center h-full text-stone-300">No messages here yet...</div>}
			<div ref={messageRef}></div>
		</div>
	);
}
