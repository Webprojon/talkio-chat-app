import { Navigate, Outlet } from "react-router-dom";
import useUserStore from "../store/userStore";

const AuthRoute = ({ access = "private" }) => {
	const { user } = useUserStore();

	if (access === "private") {
		return user ? <Outlet /> : <Navigate to="/sign-in" replace />;
	}

	if (access === "public") {
		return user ? <Navigate to="/" replace /> : <Outlet />;
	}

	return <Navigate to="/" />;
};

export default AuthRoute;
