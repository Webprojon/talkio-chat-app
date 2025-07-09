import { apiRequest } from "../lib/apiRequest";
import { useQuery } from "@tanstack/react-query";

export const useCurrentUser = () => {
	const currentUserQuery = useQuery({
		queryKey: ["user"],
		queryFn: async () => {
			const res = await apiRequest("/users/me", {
				withCredentials: true,
			});
			return res.data?.data;
		},
		staleTime: 1000 * 60 * 5,
	});
	const currentUser = currentUserQuery.data ?? null;

	return { currentUser };
};
