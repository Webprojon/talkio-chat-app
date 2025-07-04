import AuthForm from "../components/auth/AuthForm";
import AuthLayout from "../components/auth/AuthLayout";

export default function Login() {
	return (
		<AuthLayout subtitle="Log in to your account.">
			<AuthForm mode="sign-in" />
		</AuthLayout>
	);
}
