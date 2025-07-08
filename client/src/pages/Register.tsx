import AuthForm from "../components/auth/AuthForm";
import AuthLayout from "../components/auth/AuthLayout";
import { useAuthorization } from "../hooks/useAuthorization";

export default function Register() {
	const authDetails = useAuthorization({ mode: "sign-up" });

	return (
		<AuthLayout subtitle="Create your new account.">
			<AuthForm {...authDetails} />
		</AuthLayout>
	);
}
