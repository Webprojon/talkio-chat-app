import { create } from "zustand";
import type { ChatUserStore } from "../lib/types";

const useChatUserStore = create<ChatUserStore>((set) => ({
	activeChatUser: null,
	setActiveChatUser: (user) => set({ activeChatUser: user }),

	isChatOpen: false,
	setIsChatOpen: (value) => set({ isChatOpen: value }),
}));

export default useChatUserStore;
