import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "../lib/apiRequest";

export const useCurrentUser = () => {
	const { data, isLoading } = useQuery({
		queryKey: ["currentUser"],
		queryFn: async () => {
			const res = await apiRequest.get("/users/me", { withCredentials: true });
			return res.data.data;
		},
		staleTime: 1000 * 60 * 5,
	});

	return {
		isLoading,
		currentUser: data,
	};
};
