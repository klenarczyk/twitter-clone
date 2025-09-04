'use client';

import React, {useEffect, useRef} from 'react';
import {useInfinitePosts} from '@/features/post/hooks/useInfinitePosts';
import PostCard from "@/features/post/components/PostCard";
import {PostSkeleton} from "@/features/post/components/PostSkeleton";

export default function InfinitePostList({
                                             userId,
                                             initialPageSize = 8,
                                             className,
                                         }: {
    userId?: number;
    initialPageSize?: number;
    className?: string;
}) {
    const {posts, loadMore, hasMore, loading, isInitialLoading} = useInfinitePosts({userId, initialPageSize});
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (isInitialLoading && hasMore) {
            loadMore();
        }
    }, [isInitialLoading, hasMore, loadMore]);

    useEffect(() => {
        if (!sentinelRef.current || !hasMore || loading) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) loadMore();
                });
            },
            {root: null, rootMargin: "300px", threshold: 0.1}
        );

        observer.observe(sentinelRef.current);
        return () => observer.disconnect();
    }, [hasMore, loadMore, loading]);

    return (
        <section className={`space-y-4 flex flex-col w-full ${className}`}>
            {posts.map((post, key) => (
                <PostCard key={key} post={post}/>
            ))}

            {(isInitialLoading || loading) &&
                Array.from({length: initialPageSize}).map((_, i) =>
                    <PostSkeleton key={i}/>
                )}

            {hasMore && !isInitialLoading && <div ref={sentinelRef}/>}

            {!hasMore && (
                <div className="flex items-center justify-center py-6 text-sm text-mono-300">
                    You’re all caught up
                </div>
            )}
        </section>
    );
}