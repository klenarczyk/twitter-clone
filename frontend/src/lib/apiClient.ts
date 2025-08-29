type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestOptions extends RequestInit {
    token?: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const getTokenFromCookie = (): string | null => {
    const match = document.cookie.match(/(^|;)\\s*jwt=([^;]+)/);
    return match ? match[2] : null;
}

export async function apiClient<T>(
    endpoint: string,
    method: HttpMethod = 'GET',
    body?: unknown,
    options: RequestOptions = {}
): Promise<T> {
    const token = getTokenFromCookie();
    const headers = new Headers(options.headers);
    headers.set('Content-Type', 'application/json');

    if (token) headers.set('Authorization', `Bearer ${token}`);


    const res = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
        ...options,
        credentials: 'include',
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw {status: res.status, ...errorData};
    }

    return await res.json() as Promise<T>;
}