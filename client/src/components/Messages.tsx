export default function Messages() {
	//const MESSAGES = [{}];

	return (
		<div className="flex flex-col gap-3 flex-2 w-full">
			<div className="flex self-end gap-3 max-w-[50%]">
				<div className="px-2 py-1 rounded-sm bg-[#252932]">
					<p className="text-sm font-light">What are you planing today?</p>
					<span className="pt-1 text-xs font-light text-stone-400">3 min ago</span>
				</div>
				<div className="flex items-center justify-end flex-col gap-1">
					<img src="./noavatar.png" alt="user img" className="w-8 h-8 rounded-full object-cover border" />
					<span className="text-[11px] font-light">John</span>
				</div>
			</div>

			<div className="flex flex-row-reverse self-start gap-3 max-w-[50%]">
				<div className="flex flex-col px-2 py-1 rounded-sm bg-[#292e39]">
					<p className="text-sm font-light">All day sleeping 😅</p>
					<span className="self-end pt-1 text-xs font-light text-stone-400">1 min ago</span>
				</div>
				<div className="flex items-center justify-end flex-col gap-1">
					<img src="./noavatar.png" alt="user img" className="w-8 h-8 rounded-full object-cover border" />
					<span className="text-[11px] font-light">Anna</span>
				</div>
			</div>
		</div>
	);
}
