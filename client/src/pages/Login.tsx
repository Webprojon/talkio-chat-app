import AuthForm from "../components/auth/AuthForm";
import AuthLayout from "../components/auth/AuthLayout";
import { useAuthorization } from "../hooks/useAuthorization";

export default function Login() {
	const authDetails = useAuthorization({ mode: "sign-in" });

	return (
		<AuthLayout subtitle="Sign in to your account.">
			<AuthForm {...authDetails} />
		</AuthLayout>
	);
}
