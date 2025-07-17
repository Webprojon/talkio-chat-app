import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "../lib/apiRequest";
import { AxiosError } from "axios";

export const useCurrentUser = () => {
	const { data, isLoading } = useQuery({
		queryKey: ["currentUser"],
		queryFn: async () => {
			try {
				const res = await apiRequest.get("/users/me", { withCredentials: true });
				return res.data.data;
			} catch (err: unknown) {
				if (err instanceof AxiosError && err.response?.status === 401) {
					return null;
				}
				throw err;
			}
		},
		staleTime: 1000 * 60 * 5,
		retry: false,
	});

	return {
		isLoading,
		currentUser: data,
	};
};
