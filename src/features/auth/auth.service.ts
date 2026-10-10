import { apiClient } from "@/lib/api-client";
import type {
    AuthResponse,
    AuthUser,
    LoginCredentials,
} from "./auth.types";

export const authService = {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await apiClient.post<AuthResponse>(
            "/auth/login",
            credentials,
        );

        return response.data;
    },

    async getCurrentUser(): Promise<AuthUser> {
        const response = await apiClient.get<AuthResponse>("/auth/me");

        return response.data.user;
    },

    async logout(): Promise<void> {
        await apiClient.post("/auth/logout");
    },
};