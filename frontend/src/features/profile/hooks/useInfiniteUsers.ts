"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { fetchProfiles } from "@/features/profile/api/profileApi";
import { Profile } from "@/features/profile/types/user";
import { useToast } from "@/shared/toast/ToastContext";

export function useInfiniteProfiles({
	initialPageSize = 8,
	searchTerm = "",
}: {
	initialPageSize?: number;
	searchTerm?: string;
}) {
	const [profiles, setProfiles] = useState<Profile[]>([]);
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
			const res = await fetchProfiles({
				page,
				limit: pageSizeRef.current,
				searchTerm,
			});

			setProfiles((prev) => [...prev, ...res.items]);
			setPage(page + 1);
			setHasMore(res.hasMore);
		} catch (err: unknown) {
			setHasMore(false);

			if (err instanceof Error) {
				addToast({
					text: "Failed to load profiles. Please try again later.",
					type: "error",
				});
			} else {
				console.error(err);
			}
		} finally {
			setLoading(false);
			setIsInitialLoading(false);
		}
	}, [loading, hasMore, page, searchTerm, addToast]);

	const reset = useCallback(
		(newPageSize = initialPageSize) => {
			pageSizeRef.current = newPageSize;
			setProfiles([]);
			setPage(0);
			setHasMore(true);
			setIsInitialLoading(true);
		},
		[initialPageSize]
	);

	useEffect(() => {
		reset(initialPageSize);
	}, [searchTerm, initialPageSize, reset]);

	return { profiles, loadMore, hasMore, loading, reset, isInitialLoading };
}
