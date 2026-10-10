
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { getApiErrorMessage } from "@/lib/api-error";
import { authService } from "./auth.service";
import { authKeys } from "./use-auth";

export function useLogin() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: authService.login,

        onSuccess: ({ user }) => {
            queryClient.setQueryData(authKeys.me(), user);
        },

        onError: () => {
            queryClient.setQueryData(authKeys.me(), null);
        },
    });

    return {
        login: mutation.mutateAsync,
        isLoggingIn: mutation.isPending,
        errorMessage: mutation.error
            ? getApiErrorMessage(
                mutation.error,
                "Unable to sign in. Please try again.",
            )
            : null,
        reset: mutation.reset,
    };
}