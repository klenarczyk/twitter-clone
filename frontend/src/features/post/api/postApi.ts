import {apiClient} from "@/lib/api/apiClient";
import {Post} from "@/features/post/types/post";

export type FetchPostsParams = {
    page?: number;
    limit?: number;
    authorId?: number;
};

export const fetchPosts = async ({
                                     page = 0,
                                     limit = 10,
                                     authorId,
                                 }: FetchPostsParams) => {
    const params = new URLSearchParams({page: String(page), limit: String(limit)});
    if (authorId) params.append('authorId', String(authorId));

    return await apiClient<{ items: Post[]; hasMore: boolean }>(
        `/posts?${params.toString()}`
    )
}

export const createPost = async (content: string) => apiClient<Post>(
    "/posts",
    "POST",
    {content}
);