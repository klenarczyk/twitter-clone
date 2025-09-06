import {useCallback, useRef, useState} from 'react';
import {Post} from "@/features/post/types/post";
import {fetchPosts} from "@/features/post/api/postApi";

export function useInfinitePosts({
                                     userId = null,
                                     initialPageSize = 8,
                                 }: {
    userId?: number | null;
    initialPageSize?: number;
}) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const pageSizeRef = useRef(initialPageSize);

    const loadMore = useCallback(async () => {
        if (loading || !hasMore) return;
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
            console.error(err);
        } finally {
            setLoading(false);
            setIsInitialLoading(false);
        }
    }, [loading, hasMore, page, userId]);

    function reset(newPageSize = initialPageSize) {
        pageSizeRef.current = newPageSize;
        setPosts([]);
        setPage(0);
        setHasMore(true);
        setIsInitialLoading(true);
    }

    return {posts, loadMore, hasMore, reset, loading, isInitialLoading};
}