import { Link } from "react-router-dom";
import Input from "./Input";
import type { AuthFormProps } from "../../lib/types";

export default function AuthForm({ mode, handleSubmit, handleChange, formData, error, loading }: AuthFormProps) {
	const isSignUp = mode === "sign-up";
	const linkTo = isSignUp ? "/sign-in" : "/sign-up";
	const buttonText = isSignUp ? "Sign up" : "Sign in";
	const linkText = isSignUp ? (
		<span>
			Have an account? <strong>Sign in now</strong>
		</span>
	) : (
		<span>
			Haven't an account? <strong>Create account</strong>
		</span>
	);

	return (
		<form onSubmit={handleSubmit} className="w-80 flex gap-y-6 flex-col">
			{isSignUp && <Input type="text" name="username" id="username" text="Username" value={formData.username} onChange={handleChange} />}
			<Input type="email" name="email" id="email" text="Email" value={formData.email} onChange={handleChange} />
			<div className="flex flex-col gap-4">
				<Input type="password" name="password" id="password" text="Password" value={formData.password} onChange={handleChange} />
				{error && <span className="text-xs text-red-400">{error}</span>}
			</div>
			<Link to={linkTo} className="text-xs text-sky-300">
				{linkText}
			</Link>
			<button type="submit" className="flex justify-center items-center py-3 px-4 btn">
				{loading ? <div className="w-5 h-5 animate-spin rounded-full border-1 border-r-0 border-sky-300"></div> : buttonText}
			</button>
		</form>
	);
}
