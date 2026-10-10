
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { authService } from "./auth.service";

export function useLogout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: authService.logout,

        onSettled: async () => {
            await queryClient.cancelQueries();
            queryClient.clear();

            navigate("/login", { replace: true });
        },
    });

    return {
        logout: mutation.mutate,
        isLoggingOut: mutation.isPending,
        error: mutation.error,
    };
}