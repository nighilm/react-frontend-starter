
import type { QueryClient } from "@tanstack/react-query";

import type { AuthUser } from "./auth.types";
import { authKeys } from "./use-auth";

export function setAuthenticatedUser(
    queryClient: QueryClient,
    user: AuthUser,
): void {
    queryClient.setQueryData(authKeys.me(), user);
}

export function clearAuthenticatedUser(
    queryClient: QueryClient,
): void {
    queryClient.setQueryData(authKeys.me(), null);
}