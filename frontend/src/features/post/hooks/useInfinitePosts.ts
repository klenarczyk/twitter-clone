import {useCallback, useEffect, useRef, useState} from 'react';
import {Post} from "@/features/post/types/post";
import {fetchPosts} from "@/features/post/api/postApi";
import {ApiError} from "@/lib/api/httpTypes";

export function useInfinitePosts({userId = null, initialPageSize = 8}: {
    userId?: number | null;
    initialPageSize?: number
}) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const pageSizeRef = useRef(initialPageSize);
    const [loading, setLoading] = useState(false);

    const loadMore = useCallback(async () => {
        if (!hasMore || loading) return;
        setLoading(true);

        try {
            const res = await fetchPosts({
                page,
                limit: pageSizeRef.current,
                ...(userId ? {authorId: userId} : {}),
            });

            setPosts((prev) => [...prev, ...res.items]);
            setPage((prev) => prev + 1);
            setHasMore(res.hasMore);
        } catch (err: unknown) {
            if (err instanceof ApiError) {
                switch (err.status) {
                    case 500:
                        console.warn("Server error. Please try again later.");
                        break;
                    default:
                        console.error("Failed to fetch posts:", err.message);
                }
            } else {
                console.error("Unexpected error while fetching posts", err);
            }
        } finally {
            setLoading(false);
        }
    }, [hasMore, loading, page, userId]);

    useEffect(() => {
        loadMore();
    }, [])

    const reset = useCallback((newPageSize = initialPageSize) => {
        pageSizeRef.current = newPageSize;
        setPosts([]);
        setPage(0);
        setHasMore(true);
        setLoading(true);
        loadMore();
    }, [initialPageSize, loadMore]);

    return {posts, loadMore, hasMore, reset, loading};
}
