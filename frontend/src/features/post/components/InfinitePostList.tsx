"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";

import PostCard from "@/features/post/components/PostCard";
import { PostSkeleton } from "@/features/post/components/PostSkeleton";
import { useInfinitePosts } from "@/features/post/hooks/useInfinitePosts";

export default function InfinitePostList({
	parentId,
	authorId,
	initialPageSize = 8,
	emptyText = "No posts yet",
	followed = false,
	className,
}: {
	parentId?: number;
	authorId?: number;
	initialPageSize?: number;
	emptyText?: string;
	followed?: boolean;
	className?: string;
}) {
	const { posts, loadMore, hasMore, loading, isInitialLoading } = useInfinitePosts({
		authorId,
		parentId,
		followed,
		initialPageSize,
	});
	const sentinelRef = useRef<HTMLDivElement | null>(null);
	const router = useRouter();

	useEffect(() => {
		if (isInitialLoading && hasMore) {
			loadMore().catch((err) => console.error(err));
		}
	}, [isInitialLoading, hasMore, loadMore]);

	useEffect(() => {
		if (!sentinelRef.current || !hasMore || loading) return;

		const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && loadMore(), {
			rootMargin: "300px",
		});

		observer.observe(sentinelRef.current);
		return () => observer.disconnect();
	}, [hasMore, loadMore, loading]);

	return (
		<section
			className={`space-y-4 flex flex-col w-full divide-y divide-[var(--color-800)] ${className}`}
		>
			{posts.map((post, key) => (
				<div className="px-2" key={key}>
					<PostCard
						post={post}
						onClick={() => router.push(`/u/${post.author.handle}/posts/${post.id}`)}
					/>
				</div>
			))}

			{(isInitialLoading || loading) && (
				<PostSkeleton count={isInitialLoading ? initialPageSize : 3} />
			)}

			{hasMore && <div ref={sentinelRef} aria-hidden />}

			{!isInitialLoading && posts.length === 0 && (
				<div className="flex items-center justify-center py-6 text-sm text-mono-300">
					{emptyText}
				</div>
			)}

			{!hasMore && posts.length > 0 && (
				<div className="flex items-center justify-center py-6 text-sm text-mono-300">
					{parentId ? "That's all folks" : "You're all caught up"}
				</div>
			)}
		</section>
	);
}
