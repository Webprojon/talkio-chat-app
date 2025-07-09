import { Navigate, Outlet } from "react-router-dom";
import useUserStore from "../store/userStore";

export const RequireAuth = () => {
	const { user } = useUserStore();

	return user ? <Outlet /> : <Navigate to="/sign-in" replace />;
};
