import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";

export const ProtectedRoute = ({ access }: { access: "private" | "public" }) => {
	const { currentUser } = useCurrentUser();

	if (access === "private") {
		return currentUser ? <Outlet /> : <Navigate to="/sign-in" replace />;
	}

	if (access === "public") {
		return !currentUser ? <Outlet /> : <Navigate to="/" replace />;
	}

	return <Navigate to="/sign-in" replace />;
};
