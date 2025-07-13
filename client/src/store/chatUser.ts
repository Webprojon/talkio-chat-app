import { create } from "zustand";

type Chats = {
	id: number;
	username: string;
	avatar: string;
};

interface ChatUserState {
	user: Chats | null;
	setUser: (chat: Chats) => void;
	clearUser: () => void;
}

const useChatUser = create<ChatUserState>((set) => ({
	user: null,
	setUser: (chat) => set({ user: chat }),
	clearUser: () => set({ user: null }),
}));

export default useChatUser;
