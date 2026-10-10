import axios from "axios";

export function getApiErrorMessage(
    error: unknown,
    fallback = "Something went wrong. Please try again.",
): string {
    if (!axios.isAxiosError(error)) {
        return fallback;
    }

    if (!error.response) {
        return "Unable to connect to the server. Please check your connection.";
    }

    const status = error.response.status;

    if (status === 401) {
        return "Your session has expired. Please sign in again.";
    }

    if (status === 403) {
        return "You do not have permission to perform this action.";
    }

    if (status >= 500) {
        return "The server encountered an error. Please try again later.";
    }

    const data: unknown = error.response.data;

    if (
        typeof data === "object" &&
        data !== null &&
        "message" in data &&
        typeof data.message === "string"
    ) {
        return data.message;
    }

    return fallback;
}