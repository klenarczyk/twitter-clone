import {Post} from "@/features/post/types/post";
import {Profile} from "@/features/profile/types/user";
import {User} from "@/features/auth/types/auth";

export async function fetchCurrentUser(): Promise<User | null> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        credentials: "include",
    });

    if (!res.ok) return null;
    return res.json();
}

export async function fetchUserByHandle(handle: string): Promise<Profile | null> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users?handle=${handle}`, {
        credentials: "include",
    });

    if (!res.ok) return null;
    return res.json();
}

export async function fetchPosts({
                                     page = 0,
                                     limit = 10,
                                     authorId,
                                 }: { page?: number; limit?: number; authorId?: number }) {
    const params = new URLSearchParams({page: String(page), limit: String(limit)});
    if (authorId) params.append('authorId', String(authorId));

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts?${params.toString()}`, {
        credentials: "include",
    });

    if (!res.ok) throw new Error('Failed to fetch posts');
    const data = await res.json();

    return data as Promise<{ items: Post[]; hasMore: boolean }>;
}

export async function createPost(
    content: string,
) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({content}),
    });

    if (!res.ok) throw new Error('Failed to create post');
    return await res.json();
}