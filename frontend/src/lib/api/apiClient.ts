import {ApiError, HttpMethod, RequestOptions} from "@/lib/types/httpTypes";
import {API_URL} from "@/lib/constants";

export async function apiClient<T>(
    endpoint: string,
    method: HttpMethod = 'GET',
    body?: unknown,
    options: RequestOptions = {}
): Promise<T> {
    const headers = new Headers(options.headers);
    headers.set('Content-Type', 'application/json');

    const res = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
        ...options,
        credentials: 'include',
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const message = errorData.message || res.statusText;
        const errorType: string = errorData.error;
        const details = errorData?.details;

        throw new ApiError(res.status, errorType, message, details);
    }

    const text = await res.text();
    if (!text) return undefined as unknown as T;

    return JSON.parse(text) as T;
}