"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";

import ProfileCard from "@/features/profile/components/ProfileCard";
import { ProfileSkeleton } from "@/features/profile/components/ProfileSkeleton";
import { useInfiniteProfiles } from "@/features/profile/hooks/useInfiniteUsers";

export default function InfiniteProfileList({
	searchTerm,
	initialPageSize = 8,
	emptyText = "No users found",
	className,
}: {
	searchTerm: string;
	initialPageSize?: number;
	emptyText?: string;
	className?: string;
}) {
	const { profiles, loadMore, hasMore, loading, isInitialLoading } = useInfiniteProfiles({
		searchTerm,
		initialPageSize,
	});

	const sentinelRef = useRef<HTMLDivElement | null>(null);
	const router = useRouter();

	useEffect(() => {
		if (isInitialLoading && hasMore) loadMore().catch(console.error);
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
		<section className={`flex gap-4 flex-col w-full ${className}`}>
			{profiles.map((profile, key) => (
				<div
					className="px-2 cursor-pointer"
					key={key}
					onClick={() => router.push(`/u/${profile.handle}`)}
				>
					<ProfileCard profile={profile} />
				</div>
			))}

			{(isInitialLoading || loading) && (
				<ProfileSkeleton count={isInitialLoading ? initialPageSize : 3} />
			)}

			{hasMore && <div ref={sentinelRef} aria-hidden />}

			{!isInitialLoading && profiles.length === 0 && (
				<div className="flex items-center justify-center py-6 text-sm text-mono-300">
					{emptyText}
				</div>
			)}
		</section>
	);
}
