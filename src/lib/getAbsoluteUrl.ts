const BASE_URL = process.env.BETTER_AUTH_URL;

export function getAbsoluteUrl(path: string): string {
    if (!BASE_URL) {
        throw new Error("BASE_URL is not defined");
    }
    return `${BASE_URL.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}
