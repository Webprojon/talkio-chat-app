import { Navigate } from "react-router-dom";
import { type ReactNode } from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
	const { currentUser } = useCurrentUser();

	if (!currentUser) {
		return <Navigate to="/sign-in" replace />;
	}

	return <>{children}</>;
};

export const PublicRoute = ({ children }: { children: ReactNode }) => {
	const { currentUser, isLoading } = useCurrentUser();

	if (isLoading) {
		return <div className="text-xl font-extralight">Loading...</div>;
	}

	if (currentUser) {
		return <Navigate to="/chat" replace />;
	}

	return <>{children}</>;
};
