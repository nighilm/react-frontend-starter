const apiUrl = import.meta.env.VITE_API_URL;
const appName = import.meta.env.VITE_APP_NAME;

if (!apiUrl) {
    throw new Error("VITE_API_URL is not configured.");
}

if (!appName) {
    throw new Error("VITE_APP_NAME is not configured.");
}

export const env = {
    appName,
    apiUrl,
} as const;