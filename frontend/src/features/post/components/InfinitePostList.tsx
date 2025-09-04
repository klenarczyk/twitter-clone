'use client';

import React, {useEffect, useRef} from 'react';
import {useInfinitePosts} from '@/features/post/hooks/useInfinitePosts';
import PostList from "@/features/post/components/PostList";

export default function InfinitePostList({
                                             userId,
                                             initialPageSize = 8,
                                             className,
                                         }: {
    userId?: number;
    initialPageSize?: number;
    className?: string;
}) {
    const {posts, loadMore, hasMore, loading} = useInfinitePosts({userId, initialPageSize});
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!sentinelRef.current) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && hasMore && !loading) {
                        loadMore();
                    }
                });
            },
            {root: null, rootMargin: "300px", threshold: 0.1}
        );
        observer.observe(sentinelRef.current);
        return () => observer.disconnect();
    }, [loadMore, hasMore, loading]);
    
    return (
        <section className={`space-y-4 ${className}`}>
            {loading && posts.length === 0 ? (
                <div className="p-6 border rounded-lg">
                    <div className="animate-pulse space-y-3">
                        <div className="h-4 bg-mono-900 rounded w-3/4"/>
                        <div className="h-4 bg-mono-900 rounded w-1/2"/>
                        <div className="h-40 bg-mono-900 rounded"/>
                    </div>
                </div>
            ) : posts.length === 0 ? (
                <div className="text-sm text-mono-300 p-6 border rounded-lg">
                    No posts available
                </div>
            ) : (
                <PostList posts={posts} loading={loading}/>
            )}

            <div ref={sentinelRef}/>

            <div className="flex items-center justify-center py-6">
                {!hasMore ? (
                    <div className="text-sm text-mono-300">You’re all caught up</div>
                ) : (
                    <button
                        onClick={() => loadMore()}
                        disabled={loading}
                        className="px-4 py-2 rounded-full border hover:bg-[var(--color-500)]"
                    >
                        {loading ? "Loading..." : "Load more"}
                    </button>
                )}
            </div>
        </section>
    );
}

