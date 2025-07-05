import { IoSearchOutline } from "react-icons/io5";

export default function Sidebar() {
	const STATIC_DATA = [
		{
			id: 1,
			name: "John Doe",
			lastMessage: "Hi John",
		},
		{
			id: 2,
			name: "Anna",
			lastMessage: "How are you doing?",
		},
	];

	return (
		<div className="flex flex-col gap-2 flex-1 rounded-b-md border-r border-b p-3 bg-[#1C2029]">
			<div className="flex items-center gap-2 px-3 py-2 mb-2 border-b">
				<IoSearchOutline className="size-5" />
				<input type="text" name="search" id="search" placeholder="Search" autoComplete="off" className="w-full outline-none placeholder-color" />
			</div>

			{STATIC_DATA.map(({ id, name, lastMessage }) => (
				<div key={id} className="flex items-center gap-3 rounded-sm p-2 cursor-pointer transition-all bg-[#252932] hover:bg-[#2a2e38]">
					<img src="./noavatar.png" alt="user img" className="w-9 h-9 rounded-full object-cover border" />
					<div className="flex flex-col">
						<span className="text-sm font-medium">{name}</span>
						<p className="text-xs text-stone-400">{lastMessage}</p>
					</div>
				</div>
			))}
		</div>
	);
}
