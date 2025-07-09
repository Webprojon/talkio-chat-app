import { Navigate } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";

export const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
	const { currentUser } = useCurrentUser();

	if (currentUser) {
		return <Navigate to="/" replace />;
	}
	return <>{children}</>;
};
