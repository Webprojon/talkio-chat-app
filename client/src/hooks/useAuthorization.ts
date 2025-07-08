import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../lib/apiRequest";
import type { AxiosError } from "axios";
import useUserStore from "../store/userStore";

export const useAuthorization = () => {
	const navigate = useNavigate();
	const { setUser } = useUserStore.getState();
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

		if (!username || !email || !password) {
			setError("All fields are required");
			setLoading(false);
			return;
		}

		try {
			const res = await apiRequest.post(
				"/auth/sign-up",
				{
					username,
					email,
					password,
				},
				{ withCredentials: true },
			);

			setUser(res.data.data);
			navigate("/");
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
		formData,
		handleChange,
		handleSubmit,
	};
};
