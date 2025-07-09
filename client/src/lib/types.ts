export interface InputProps {
	id: string;
	name: string;
	type: string;
	text: string;
	className?: string;
	value: string | number;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

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
	mode: "sign-in" | "sign-up";
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
