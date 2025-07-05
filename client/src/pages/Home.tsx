import Chat from "../components/Chat";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function Home() {
	return (
		<div className="rounded-md w-240 bg-[#10141E]">
			<Header />
			<div className="flex h-140">
				<Sidebar />
				<Chat />
			</div>
		</div>
	);
}
