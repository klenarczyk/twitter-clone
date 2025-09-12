import { Post } from "@/features/post/types/post";
import { apiClient } from "@/lib/api/apiClient";

export type FetchPostsParams = {
	page?: number;
	limit?: number;
	authorId?: number;
	parentId?: number;
	followed?: boolean;
};

export const fetchPosts = async ({
	page = 0,
	limit = 10,
	followed = false,
	authorId,
	parentId,
}: FetchPostsParams) => {
	const params = new URLSearchParams({ page: String(page), limit: String(limit) });
	params.append("followed", String(followed));
	if (parentId) {
		params.append("parentId", String(parentId));
	} else if (authorId) {
		params.append("authorId", String(authorId));
	}

	const res = await apiClient<{ items: Post[]; hasMore: boolean }>(`/posts?${params.toString()}`);

	return {
		...res,
		items: res.items.map((post) => ({
			...post,
			createdAt: new Date(post.createdAt),
		})),
	} as { items: Post[]; hasMore: boolean };
};

export const fetchPostById = async (postId: number) => {
	const res = await apiClient<Post>(`/posts/${postId}`);

	return {
		...res,
		createdAt: new Date(res.createdAt),
	} as Post;
};

export const createPost = async (content: string, parentId?: number | null) =>
	apiClient<Post>("/posts", "POST", {
		content,
		parentPostId: parentId ?? null,
	});

export const deletePost = async (postId: number) => apiClient(`/posts/${postId}`, "DELETE");

export const likePost = async (postId: number) => apiClient(`/posts/${postId}/like`, "POST");

export const unlikePost = async (postId: number) => apiClient(`/posts/${postId}/like`, "DELETE");
