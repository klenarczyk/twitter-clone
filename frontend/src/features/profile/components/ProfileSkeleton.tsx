"use client";

import React from "react";

export function ProfileSkeleton({ count = 3 }: { count?: number }) {
	return (
		<>
			{Array.from({ length: count }).map((_, i) => (
				<div key={i} className="flex items-center space-x-4 p-3 rounded-lg animate-pulse">
					<div className="size-12 rounded-full bg-zinc-700" />
					<div className="flex flex-col flex-1">
						<div className="h-4 bg-zinc-700 rounded w-1/3 mb-1" />
						<div className="h-3 bg-zinc-700 rounded w-1/2" />
					</div>
				</div>
			))}
		</>
	);
}
