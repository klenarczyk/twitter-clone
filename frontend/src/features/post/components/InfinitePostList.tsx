"use client";

import React, { useEffect, useRef } from "react";

import PostCard from "@/features/post/components/PostCard";
import { PostSkeleton } from "@/features/post/components/PostSkeleton";
import { useInfinitePosts } from "@/features/post/hooks/useInfinitePosts";

export default function InfinitePostList({
	userId,
	initialPageSize = 8,
	emptyText = "No posts yet",
	className,
}: {
	userId?: number;
	initialPageSize?: number;
	emptyText?: string;
	className?: string;
}) {
	const { posts, loadMore, hasMore, loading, isInitialLoading } = useInfinitePosts({
		userId,
		initialPageSize,
	});
	const sentinelRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (isInitialLoading && hasMore) {
			(async () => {
				try {
					await loadMore();
				} catch (err) {
					console.error(err);
				}
			})();
		}
	}, [isInitialLoading, hasMore, loadMore, loading]);

	useEffect(() => {
		if (!sentinelRef.current || !hasMore || loading) return;

		const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && loadMore(), {
			rootMargin: "300px",
		});

		observer.observe(sentinelRef.current);
		return () => observer.disconnect();
	}, [hasMore, loadMore, loading]);

	return (
		<section className={`space-y-4 flex flex-col w-full ${className}`}>
			{posts.map((post, key) => (
				<PostCard key={key} post={post} />
			))}

			{(isInitialLoading || loading) &&
				Array.from({
					length: initialPageSize,
				}).map((_, key) => <PostSkeleton key={key} />)}

			{hasMore && <div ref={sentinelRef} aria-hidden />}

			{!isInitialLoading && posts.length === 0 && (
				<div className="flex items-center justify-center py-6 text-sm text-mono-300">
					{emptyText}
				</div>
			)}

			{!hasMore && posts.length > 0 && (
				<div className="flex items-center justify-center py-6 text-sm text-mono-300">
					You&#39;re all caught up
				</div>
			)}
		</section>
	);
}
