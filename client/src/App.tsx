import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
	return (
		<div className="flex-center sm:h-screen leading-none select-none tracking-wider text-slate-300 bg-[#030712]">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/sign-in" element={<Login />} />
				<Route path="/sign-up" element={<Register />} />
			</Routes>
			<div className="bg-opacity top-[-33rem]"></div>
			<div className="bg-opacity bottom-[-34rem]"></div>
		</div>
	);
}
