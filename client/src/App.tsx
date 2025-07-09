import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthRoute from "./components/RequireAuth";

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <AuthRoute access="private" />,
			children: [
				{
					index: true,
					element: <Home />,
				},
			],
		},
		{
			path: "/sign-in",
			element: <AuthRoute access="public" />,
			children: [
				{
					index: true,
					element: <Login />,
				},
			],
		},
		{
			path: "/sign-up",
			element: <AuthRoute access="public" />,
			children: [
				{
					index: true,
					element: <Register />,
				},
			],
		},
	]);
	return (
		<div className="flex-center sm:h-screen leading-none select-none tracking-wider text-slate-300 bg-[#030712]">
			<RouterProvider router={router} />
			<div className="bg-opacity top-[-33rem]"></div>
			<div className="bg-opacity bottom-[-34rem]"></div>
		</div>
	);
}
export default App;
