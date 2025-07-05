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
				className="font-light flex-1 h-12 p-2 border rounded-sm outline-0 placeholder-color"
			></textarea>
			<button className="px-6 btn">
				<IoIosSend className="size-7" />
			</button>
		</form>
	);
}
