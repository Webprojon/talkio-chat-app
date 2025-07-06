import { IoIosSend } from "react-icons/io";

export default function SendMessage() {
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
	};

	return (
		<form onSubmit={handleSubmit} className="flex gap-4">
			<textarea
				name="sendMessage"
				id="sendMessage"
				placeholder="write here..."
				className="font-light flex-1 h-15 p-2 border rounded-sm outline-0 placeholder-color"
			></textarea>
			<button className="group px-4 border rounded-sm cursor-pointer text-sky-300">
				<IoIosSend className="size-7 group-hover:scale-110 transition-all" />
			</button>
		</form>
	);
}
