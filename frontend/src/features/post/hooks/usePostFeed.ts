import {useCallback, useEffect, useRef, useState} from 'react';
import {Post} from "@/features/post/types/post";
import {fetchPosts} from "@/features/post/api/postApi";
import {ApiError} from "@/shared/api/httpTypes";

export function usePostFeed({userId = null, initialPageSize = 8}: {
    userId?: number | null;
    initialPageSize?: number
}) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState(-1);
    const [hasMore, setHasMore] = useState(true);
    const pageSizeRef = useRef(initialPageSize);

    const loadMore = useCallback(async () => {
        if (!hasMore) return;

        try {
            const res = await fetchPosts({
                page: page + 1,
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
        }
    }, [hasMore, page, userId]);

    useEffect(() => {
        loadMore();
    }, []);

    function reset(newPageSize = initialPageSize) {
        pageSizeRef.current = newPageSize;
        setPosts([]);
        setPage(0);
        setHasMore(true);
    }

    return {posts, loadMore, hasMore, reset};
}