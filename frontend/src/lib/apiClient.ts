type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestOptions extends RequestInit {
    token?: string;
}

export class ApiError extends Error {
    status: number;
    data: any;

    constructor(status: number, message: string, data: any = {}) {
        super(message);
        this.status = status;
        this.data = data;
    }
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiClient<T>(
    endpoint: string,
    method: HttpMethod = 'GET',
    body?: unknown,
    options: RequestOptions = {}
): Promise<T> {
    const headers = new Headers(options.headers);
    headers.set('Content-Type', 'application/json');

    const res = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
        ...options,
        credentials: 'include',
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const message = errorData.message || res.statusText || 'Request failed';
        throw new ApiError(res.status, message, errorData);
    }

    const text = await res.text();
    if (!text) return undefined as unknown as T;

    return JSON.parse(text) as T;
}