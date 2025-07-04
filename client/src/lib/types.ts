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
	name?: string;
	email: string;
	password: string;
}

type Mode = "sign-in" | "sign-up";

export interface UseAuthorizationProps {
	mode: Mode;
}

export interface AuthFormProps<T> {
	formData: T;
	setFormData: React.Dispatch<React.SetStateAction<T>>;
	errors: Partial<Record<keyof T, string>>;
	setErrors: React.Dispatch<React.SetStateAction<Partial<Record<keyof T, string>>>>;
	handleSubmit: (e: React.FormEvent, data: T, setErrors: AuthFormProps<T>["setErrors"]) => void;
	isPending: boolean;
	mode: "sign-in" | "sign-up";
}
