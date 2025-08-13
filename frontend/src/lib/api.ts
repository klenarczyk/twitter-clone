interface UserSummary {
    id: number;
    fullName: string;
    handle: string;
}

export async function fetchCurrentUser(): Promise<UserSummary | null> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        credentials: "include",
    });

    if (!res.ok) return null;
    return res.json();
}