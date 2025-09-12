"use client";

import { motion } from "framer-motion";
import { Ellipsis, Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

import { likePost, unlikePost } from "@/features/post/api/postApi";
import { Post } from "@/features/post/types/post";
import { getProfileImage } from "@/features/profile/utils/getProfileImage";
import formatDate from "@/shared/utils/formatDate";
import { formatNumber } from "@/shared/utils/formatNumber";
import { useComposer } from "@/features/post/context/ComposerContext";

type PostCardProps = {
	post: Post;
	onClick?: () => void;
};

export default function PostCard({ post, onClick }: PostCardProps) {
	const { openComposer } = useComposer();

	const imageUrl = getProfileImage(post.author.imageUrl);
	const timeAgo = formatDate(post.createdAt);

	const textRef = useRef<HTMLParagraphElement>(null);
	const [isOverflowing, setIsOverflowing] = useState(false);
	const [expanded, setExpanded] = useState(false);

	const [likeCount, setLikeCount] = useState(post.likeCount || 0);
	const [isLiked, setIsLiked] = useState(post.isLiked);
	const isLiking = useRef(false);

	const [replyCount] = useState(post.replyCount || 0);

	const handleLike = async () => {
		if (isLiking.current) return;
		isLiking.current = true;
		try {
			if (isLiked) {
				await unlikePost(post.id);
				setLikeCount(likeCount - 1);
			} else {
				await likePost(post.id);
				setLikeCount(likeCount + 1);
			}
			setIsLiked(!isLiked);
		} finally {
			isLiking.current = false;
		}
	};

	useEffect(() => {
		if (textRef.current) {
			setIsOverflowing(textRef.current.scrollHeight > textRef.current.clientHeight);
		}
	}, [post.content]);

	return (
		<motion.article
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.18 }}
			className={`p-4 relative ${onClick && "cursor-pointer"}`}
			aria-labelledby={post.id.toString()}
			onClick={(e) => {
				const target = e.target as HTMLElement;

				if (!target.closest("button") && !target.closest("a") && onClick) {
					onClick();
				}
			}}
		>
			<div className="flex gap-3 relative">
				<div className="relative flex flex-col items-center">
					<Link
						href={`/u/${post.author.handle}`}
						className="size-12 rounded-full bg-mono-100 flex items-center justify-center cursor-pointer relative"
					>
						<Image
							src={imageUrl!}
							alt="Profile"
							height={50}
							width={50}
							className="rounded-full"
						/>
					</Link>
				</div>

				<div className="flex-1">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<Link
								href={`/u/${post.author.handle}`}
								className="font-bold text-mono-100 cursor-pointer"
							>
								{post.author.handle}
							</Link>
							<div className="text-mono-300 text-sm">{timeAgo}</div>
						</div>
						<div className="text-mono-300 cursor-pointer">
							<Ellipsis className="size-5" />
						</div>
					</div>

					<p
						id={post.id.toString()}
						ref={textRef}
						className={`mt-2 text-sm text-mono-100 leading-6 whitespace-pre-wrap ${
							!expanded ? "line-clamp-4 overflow-hidden" : ""
						}`}
					>
						{post.content}
					</p>

					{isOverflowing && (
						<button
							className="text-sm text-[var(--color-500)] mt-1 cursor-pointer"
							onClick={() => setExpanded(!expanded)}
						>
							{expanded ? "Show less" : "Show more"}
						</button>
					)}

					<div className="mt-3 flex items-center gap-3 text-sm text-mono-500">
						<button
							onClick={handleLike}
							className="flex items-center gap-0.5 cursor-pointer"
						>
							<motion.div
								initial={false}
								animate={{
									scale: isLiked ? [1, 1.3, 1] : 1,
									rotate: isLiked ? [0, -5, 5, 0] : 0,
									color: isLiked ? "#ef4444" : "#9ca3af",
								}}
								transition={{ duration: 0.3 }}
							>
								<Heart
									className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : "text-mono-400"}`}
								/>
							</motion.div>
							<span className="ml-1 text-mono-400">{formatNumber(likeCount)}</span>
						</button>
						<button
							onClick={() => openComposer(post)}
							className="flex items-center gap-0.5 text-mono-400 hover:text-[var(--color-500)] cursor-pointer"
						>
							<MessageCircle className="size-4" />
							<span className="ml-1">{formatNumber(replyCount)}</span>
						</button>
					</div>
				</div>
			</div>
		</motion.article>
	);
}
