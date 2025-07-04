import AuthForm from "../components/auth/AuthForm";
import AuthLayout from "../components/auth/AuthLayout";

export default function Register() {
	return (
		<AuthLayout subtitle="Create your new account.">
			<AuthForm mode="sign-up" />
		</AuthLayout>
	);
}
