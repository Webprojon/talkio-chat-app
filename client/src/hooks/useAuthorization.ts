import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../lib/apiRequest";
import type { AxiosError } from "axios";

export const useAuthorization = ({ mode }: { mode: "sign-up" | "sign-in" }) => {
	const navigate = useNavigate();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({ username: "", email: "", password: "" });

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		const { username, email, password } = formData;

		if (!email || !password || (mode === "sign-up" && !username)) {
			setError("All fields are required");
			setLoading(false);
			return;
		}

		const payload = mode === "sign-up" ? { username, email, password } : { email, password };

		try {
			await apiRequest.post(`/auth/${mode}`, payload, { withCredentials: true });
			navigate("/chat");
		} catch (err) {
			const error = err as AxiosError<{ message: string }>;
			setError(error.response?.data?.message || "Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	return {
		error,
		loading,
		mode,
		formData,
		setFormData,
		handleChange,
		handleSubmit,
	};
};
