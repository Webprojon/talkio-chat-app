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

export interface AuthUserType {
	username?: string;
	email: string;
	password: string;
}

type Mode = "sign-in" | "sign-up";

export interface UseAuthorizationProps {
	mode: Mode;
}

export interface AuthFormProps<T> {
	formData: T;
	loading: boolean;
	mode: "sign-in" | "sign-up";
	error: Partial<Record<keyof T, string>>;
	setFormData: React.Dispatch<React.SetStateAction<T>>;
	handleSubmit: (e: React.FormEvent, data: T) => void;
}
