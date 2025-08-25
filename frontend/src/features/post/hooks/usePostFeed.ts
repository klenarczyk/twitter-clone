import {useEffect, useRef, useState} from 'react';
import {Post} from "@/features/post/types/post";
import {fetchPosts} from "@/lib/api";

export function usePostFeed({userId = null, initialPageSize = 8}: {
    userId?: number | null;
    initialPageSize?: number
}) {
    // State to hold posts
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState(-1);
    const [hasMore, setHasMore] = useState(true);
    const pageSizeRef = useRef(initialPageSize);

    useEffect(() => {
        loadMore();
    }, []);

    async function loadMore() {
        if (!hasMore) return;
        let res;
        if (userId) {
            res = await fetchPosts({page: page + 1, limit: pageSizeRef.current, authorId: userId});
        } else {
            res = await fetchPosts({page: page + 1, limit: pageSizeRef.current});
        }
        setPosts((prev) => [...prev, ...res.items]);
        setPage(page + 1);
        setHasMore(res.hasMore);
    }

    function reset(newPageSize = initialPageSize) {
        pageSizeRef.current = newPageSize;
        setPosts([]);
        setPage(0);
        setHasMore(true);
    }

    return {posts, loadMore, hasMore, reset};
}