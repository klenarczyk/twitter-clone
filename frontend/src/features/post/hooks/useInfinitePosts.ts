import { useCallback, useEffect, useRef, useState } from "react";

import { fetchPosts } from "@/features/post/api/postApi";
import { Post } from "@/features/post/types/post";
import { useToast } from "@/shared/toast/useToast";

export function useInfinitePosts({
	parentId = null,
	authorId = null,
	followed = false,
	initialPageSize = 8,
}: {
	parentId?: number | null;
	authorId?: number | null;
	followed?: boolean;
	initialPageSize?: number;
}) {
	const [posts, setPosts] = useState<Post[]>([]);
	const [page, setPage] = useState(0);
	const [hasMore, setHasMore] = useState(true);
	const [loading, setLoading] = useState(false);
	const [isInitialLoading, setIsInitialLoading] = useState(true);
	const pageSizeRef = useRef(initialPageSize);

	const { addToast } = useToast();

	const loadMore = useCallback(async () => {
		if (loading || !hasMore) return;
		setLoading(true);

		try {
			const res = await fetchPosts({
				page,
				limit: pageSizeRef.current,
				followed,
				...(parentId ? { parentId } : authorId ? { authorId } : {}),
			});

			setPosts((prev) => [...prev, ...res.items]);
			setPage(page + 1);
			setHasMore(res.hasMore);
		} catch (err: unknown) {
			setHasMore(false);

			if (err instanceof Error) {
				addToast({
					text: "Failed to load posts. Please try again later.",
					type: "error",
				});
			} else {
				console.error(err);
			}
		} finally {
			setLoading(false);
			setIsInitialLoading(false);
		}
	}, [loading, hasMore, page, followed, parentId, authorId, addToast]);

	const reset = useCallback(
		(newPageSize = initialPageSize) => {
			pageSizeRef.current = newPageSize;
			setPosts([]);
			setPage(0);
			setHasMore(true);
			setIsInitialLoading(true);
		},
		[initialPageSize]
	);

	useEffect(() => {
		reset(initialPageSize);
	}, [followed, authorId, parentId, initialPageSize, reset]);

	return { posts, loadMore, hasMore, loading, reset, isInitialLoading };
}
