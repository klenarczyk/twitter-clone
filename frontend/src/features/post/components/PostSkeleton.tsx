import { motion } from "framer-motion";
import React from "react";

export function PostSkeleton({ count = 3 }: { count?: number }) {
	return Array.from({ length: count }).map((_, key) => (
		<div className="px-2" key={key}>
			<motion.article
				initial={{ opacity: 0, y: 6 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.18 }}
				className="p-4 animate-pulse"
			>
				<div className="flex gap-3">
					<div className="w-12 h-12 rounded-full bg-mono-800" />
					<div className="flex-1 space-y-2">
						<div className="h-3 bg-mono-800 rounded w-1/4" />
						<div className="h-3 bg-mono-800 rounded w-1/2" />
						<div className="h-3 bg-mono-800 rounded w-3/4 mt-2" />
					</div>
				</div>
			</motion.article>
		</div>
	));
}
