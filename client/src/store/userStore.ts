import { create } from "zustand";

type User = {
	id: string;
	username: string;
	email: string;
	avatar: string;
};

type UserStore = {
	user: User | null;
	setUser: (user: User) => void;
};

const useUserStore = create<UserStore>((set) => {
	const storedUser = localStorage.getItem("user");
	const parsedUser = storedUser ? JSON.parse(storedUser) : null;

	return {
		user: parsedUser,
		setUser: (user) => {
			localStorage.setItem("user", JSON.stringify(user));
			set({ user });
		},
	};
});

export default useUserStore;
