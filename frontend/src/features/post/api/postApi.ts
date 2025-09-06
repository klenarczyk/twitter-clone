import { Post } from "@/features/post/types/post";
import { apiClient } from "@/lib/api/apiClient";

export type FetchPostsParams = {
	page?: number;
	limit?: number;
	authorId?: number;
};

export const fetchPosts = async ({ page = 0, limit = 10, authorId }: FetchPostsParams) => {
	const params = new URLSearchParams({ page: String(page), limit: String(limit) });
	if (authorId) params.append("authorId", String(authorId));

	const res = await apiClient<{ items: Post[]; hasMore: boolean }>(`/posts?${params.toString()}`);

	return {
		...res,
		items: res.items.map((post) => ({
			...post,
			createdAt: new Date(post.createdAt),
		})),
	} as { items: Post[]; hasMore: boolean };
};

export const createPost = async (content: string) => apiClient<Post>("/posts", "POST", { content });
