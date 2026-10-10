
import { useQuery } from "@tanstack/react-query";

import { authService } from "./auth.service";

export const authKeys = {
    all: ["auth"] as const,
    me: () => [...authKeys.all, "me"] as const,
};

export function useAuth() {
    const query = useQuery({
        queryKey: authKeys.me(),
        queryFn: authService.getCurrentUser,
        retry: false,
        refetchOnWindowFocus: true,
        staleTime: 30_000,
    });

    return {
        user: query.data ?? null,
        isAuthenticated: Boolean(query.data),
        isLoading: query.isPending,
        isError: query.isError,
        error: query.error,
        refetch: query.refetch,
    };
}