"use client";

import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";

import { fetchPostById } from "@/features/post/api/postApi";
import InfinitePostList from "@/features/post/components/InfinitePostList";
import PostCard from "@/features/post/components/PostCard";
import { Post } from "@/features/post/types/post";
import { useRouter } from "next/navigation";

export default function PostReplies({
	initialPageSize = 8,
	postId,
}: {
	initialPageSize?: number;
	postId: number;
}) {
	const [post, setPost] = useState<Post | null>(null);
	const [loadingPost, setLoadingPost] = useState(true);
	const router = useRouter();

	useEffect(() => {
		(async () => {
			setLoadingPost(true);
			try {
				const res = await fetchPostById(postId);
				setPost(res);
			} catch (err: unknown) {
				if (err instanceof Error) {
					console.error("Failed to fetch post:", err.message);
				} else {
					console.error("Failed to fetch post:", err);
				}
			} finally {
				setLoadingPost(false);
			}
		})();
	}, [postId]);

	if (loadingPost) {
		return (
			<div className="flex justify-center items-center h-64">
				<div className="animate-spin rounded-full h-10 w-10 border-4 border-zinc-600 border-t-transparent"></div>
			</div>
		);
	}

	if (!post) {
		return (
			<div className="flex justify-center items-center h-64 text-zinc-400">
				Post not found.
			</div>
		);
	}

	return (
		<div className="md:space-y-4 mb-14 md:mb-8 relative">
			<div className="hidden md:flex sticky top-14 md:top-4 z-10 items-center px-4 py-1">
				<button
					onClick={() => router.back()}
					className="p-2 rounded-full transition cursor-pointer"
				>
					<ChevronLeft className="text-white hover:text-zinc-400 transition-colors" />
				</button>

				<div className="flex-1 text-center">
					<h1 className="text-lg font-semibold text-white">Post</h1>
				</div>

				<div className="w-9" />
			</div>

			<div className="md:bg-zinc-900 rounded-2xl shadow-sm md:border md:border-zinc-800 md:mt-8 pt-2">
				<PostCard post={post} />
				<div className="px-4 py-2 text-sm text-mono-300 pt-2 border-y border-zinc-800">
					Replies
				</div>

				<main className="w-full max-w-2xl mx-auto">
					<InfinitePostList
						parentId={postId}
						initialPageSize={initialPageSize}
						emptyText="No replies yet"
					/>
				</main>
			</div>
		</div>
	);
}
