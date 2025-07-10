import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PrivateRoute, PublicRoute } from "./components/ProtectRoute";
import ChatPage from "./pages/ChatPage";

function App() {
	const queryClient = new QueryClient();

	const router = createBrowserRouter([
		{
			path: "/",
			element: <Home />,
		},
		{
			path: "/chat",
			element: (
				<PrivateRoute>
					<ChatPage />
				</PrivateRoute>
			),
		},
		{
			path: "/sign-in",
			element: (
				<PublicRoute>
					<Login />
				</PublicRoute>
			),
		},
		{
			path: "/sign-up",
			element: (
				<PublicRoute>
					<Register />
				</PublicRoute>
			),
		},
	]);

	return (
		<QueryClientProvider client={queryClient}>
			<div className="flex-center sm:h-screen leading-none select-none tracking-wider text-slate-300 bg-[#030712]">
				<RouterProvider router={router} />
				<div className="bg-opacity top-[-33rem]"></div>
				<div className="bg-opacity bottom-[-34rem]"></div>
			</div>
		</QueryClientProvider>
	);
}
export default App;
