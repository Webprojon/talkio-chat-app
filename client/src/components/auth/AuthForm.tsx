import { Link } from "react-router-dom";
import Input from "./Input";
import type { UseAuthorizationProps } from "../../lib/types";
export default function AuthForm({ mode }: UseAuthorizationProps) {
	const isSignUp = mode === "sign-up";
	const linkTo = isSignUp ? "/sign-in" : "/sign-up";
	const buttonText = isSignUp ? "Sign up" : "Sign in";
	const linkText = isSignUp ? "Log in now" : "Create account";

	return (
		<form className="w-80 flex gap-y-6 flex-col">
			{isSignUp && <Input type="text" name="name" id="name" text="Name" value={"Name"} onChange={() => ""} />}
			<Input type="email" name="email" id="email" text="Email" value={"Email"} onChange={() => ""} />
			<div className="flex flex-col gap-4">
				<Input type="password" name="password" id="password" text="Password" value={"Password"} onChange={() => ""} />
				{/*<span className="text-xs text-red-400">Invalid email or password</span>*/}
			</div>
			<Link to={linkTo} className="text-xs text-sky-300">
				Have an account? <strong>{linkText}</strong>
			</Link>
			<button type="submit" className="flex justify-center items-center py-3 sm:py-2 px-4 btn">
				{buttonText}
			</button>
		</form>
	);
}
