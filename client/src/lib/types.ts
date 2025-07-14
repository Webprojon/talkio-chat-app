// Belongs To Input Component ////////////////////////////////////////////////
export interface InputProps {
	id: string;
	name: string;
	type: string;
	text: string;
	className?: string;
	value: string | number;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Belongs To Auth Components ////////////////////////////////////////////////
export interface AuthLayoutProps {
	subtitle: string;
	children: React.ReactNode;
}

export interface UserType {
	username?: string;
	email: string;
	password: string;
	avatar: string;
}

export interface AuthFormProps {
	error: string;
	loading: boolean;
	formData: {
		username: string;
		email: string;
		password: string;
	};
	userImage: File | null;
	setUserImage: (file: File | null) => void;
	mode: "sign-in" | "sign-up";
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Belongs To Sidebar Component ////////////////////////////////////////////////
export interface ChatUser {
	id: string;
	username: string;
	avatar: string;
}

export interface UserChat {
	id: string;
	lastMessage: string;
	receiver: ChatUser;
}

// Belongs To Chat & Message Component ////////////////////////////////////////////////
interface Receiver {
	id: string;
	username: string;
	avatar: string;
}

export interface Message {
	id: string;
	userId: string;
	text: string;
	createdAt: string;
}

export interface ActiveChatUser {
	id: string;
	receiver: Receiver;
	data: {
		id: string;
		messages: Message[];
	};
}

export interface Chat {
	messages: Message[];
}

// Belongs To Chat User Store ////////////////////////////////////////////////
export interface ChatUserStore {
	activeChatUser: ChatUser | null;
	setActiveChatUser: (user: ChatUser) => void;
}
