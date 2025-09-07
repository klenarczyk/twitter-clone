"use client";

import { motion } from "framer-motion";
import { Ellipsis, Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

import { Post } from "@/features/post/types/post";
import { getProfileImage } from "@/features/profile/utils/getProfileImage";
import formatDate from "@/shared/utils/formatDate";

export default function PostCard({ post }: { post: Post }) {
	const imageUrl = getProfileImage(post.author.imageUrl);
	const timeAgo = formatDate(post.createdAt);

	const textRef = useRef<HTMLParagraphElement>(null);
	const [isOverflowing, setIsOverflowing] = useState(false);
	const [expanded, setExpanded] = useState(false);

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
			className="p-4 relative"
			aria-labelledby={post.id.toString()}
		>
			<div className="flex gap-3 relative">
				<div className="relative flex flex-col items-center">
					<Link
						href={`/u/${post.author.handle}`}
						className="w-12 h-12 rounded-full bg-mono-100 flex items-center justify-center cursor-pointer"
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

					<div className="mt-3 flex items-center gap-4 text-sm text-mono-500">
						<button className="flex items-center gap-1 hover:text-[var(--color-700)] cursor-pointer">
							<Heart className="w-4 h-4" />
							<span className="ml-1 text-mono-400">12</span>
						</button>
						<button className="flex items-center gap-1 hover:text-[var(--color-700)] cursor-pointer">
							<MessageCircle className="w-4 h-4" />
							<span className="ml-1 text-mono-400">3</span>
						</button>
					</div>
				</div>
			</div>
		</motion.article>
	);
}
