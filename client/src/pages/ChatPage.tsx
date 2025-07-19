import Chat from "../components/chat/Chat";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import useChatUserStore from "../store/chatUser";

export default function ChatPage() {
	const { isChatOpen } = useChatUserStore();
	return (
		<div className="rounded-md w-220 bg-[#10141E]">
			<Header />
			<div className="flex sm:hidden min-h-screen sm:min-h-140">{!isChatOpen ? <Sidebar /> : <Chat />}</div>
			<div className="hidden sm:flex min-h-screen sm:min-h-140">
				<Sidebar />
				<Chat />
			</div>
		</div>
	);
}
