import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../lib/apiRequest";
import type { AxiosError } from "axios";

export const useAuthorization = ({ mode }: { mode: "sign-up" | "sign-in" }) => {
	const [userImage, setUserImage] = useState<File | null>(null);
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

		try {
			if (mode === "sign-up") {
				const formDataToSend = new FormData();
				formDataToSend.append("username", username);
				formDataToSend.append("email", email);
				formDataToSend.append("password", password);
				if (userImage) {
					formDataToSend.append("avatar", userImage);
				}

				await apiRequest.post(`/auth/sign-up`, formDataToSend, {
					withCredentials: true,
					headers: {
						"Content-Type": "multipart/form-data",
					},
				});
			} else {
				await apiRequest.post(`/auth/sign-in`, { email, password }, { withCredentials: true });
			}

			navigate("/chat");
		} catch (err) {
			const error = err as AxiosError<{ message: string }>;
			setError(error.response?.data?.message || "Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	return {
		mode,
		error,
		loading,
		formData,
		userImage,
		setFormData,
		handleSubmit,
		handleChange,
		setUserImage,
	};
};
