export default function Messages() {
	const STATIC_MESSAGES = [
		{
			id: 0,
			time: "3 min ago",
			text: "What are you planing today?",
			account: true,
		},
		{
			id: 1,
			time: "1 min ago",
			text: "All day sleeping 😅",
			account: false,
		},
		{
			id: 2,
			time: "3 min ago",
			text: "What are you planing today?",
			account: true,
		},
		{
			id: 3,
			time: "1 min ago",
			text: "All day sleeping 😅",
			account: false,
		},
	];

	return (
		<div className="flex flex-col gap-5 flex-2 w-full overflow-y-auto noscrollbar">
			{STATIC_MESSAGES.map(({ id, time, text, account }) => (
				<div key={id} className={`flex gap-3 max-w-[55%] sm:max-w-[50%] ${account ? "self-end" : "flex-row-reverse self-start"}`}>
					<div className="px-2 py-1 rounded-sm bg-[#252932]">
						<p className="text-sm font-light">{text}</p>
						<span className="pt-1 text-xs font-light text-stone-400">{time}</span>
					</div>
				</div>
			))}
		</div>
	);
}
