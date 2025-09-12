"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { useAuth } from "@/features/auth/context/AuthContext";
import { createPost } from "@/features/post/api/postApi";
import { Post } from "@/features/post/types/post";
import { getProfileImage } from "@/features/profile/utils/getProfileImage";
import { ApiError } from "@/lib/api/httpTypes";
import { TextArea } from "@/shared/components/ui/TextArea";
import { useToast } from "@/shared/toast/useToast";
import Popup from "@/shared/components/ui/Popup";

interface ComposerProps {
	parent?: Post | null;
	onClose?: () => void;
}

export default function Composer({ parent, onClose }: ComposerProps) {
	const router = useRouter();
	const { addToast } = useToast();
	const { user, loading } = useAuth();
	const imageUrl = getProfileImage(user?.imageUrl, loading);
	const parentImageUrl = getProfileImage(parent?.author.imageUrl);

	const [text, setText] = useState<string>("");
	const CHARACTER_LIMIT = 280;
	const canPost = text.trim().length > 0 && text.length <= CHARACTER_LIMIT;
	const overflowCount = text.length > CHARACTER_LIMIT ? text.length - CHARACTER_LIMIT : 0;

	async function handlePost() {
		if (!canPost) return;
		try {
			await createPost(text, parent?.id);
			addToast({
				text: `${parent ? "Reply" : "Post"} created successfully!`,
				type: "success",
			});
			onClose?.();
		} catch (err: unknown) {
			if (err instanceof ApiError) {
				switch (err.status) {
					case 401:
						addToast({ text: "You must be logged in to post.", type: "error" });
						break;
					case 500:
						addToast({ text: "Server error. Try again later.", type: "error" });
						break;
					default:
						addToast({ text: `Failed: ${err.message}`, type: "error" });
				}
			} else {
				addToast({ text: "Unexpected error. Try again.", type: "error" });
			}
		} finally {
			setText("");
			router.refresh();
		}
	}

	useEffect(() => {
		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === "Escape") onClose?.();
		};

		document.addEventListener("keydown", handleEsc);
		return () => document.removeEventListener("keydown", handleEsc);
	}, [onClose]);

	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "";
		};
	}, []);

	return (
		<Popup title={parent ? "Reply" : "Compose"} onClose={onClose}>
			{/* Content */}
			<div className="flex-1 flex flex-col overflow-y-auto px-4 py-3">
				{parent && (
					<div className="mb-3 p-3 rounded-xl bg-zinc-800 border border-zinc-800">
						<div className="flex gap-3">
							<Image
								src={parentImageUrl!}
								alt="Parent profile"
								height={32}
								width={32}
								className="rounded-full size-8"
							/>
							<div className="flex flex-col">
								<span className="text-white font-semibold">
									{parent.author.handle}
								</span>
								<p className="text-mono-200 whitespace-pre-wrap">
									{parent.content}
								</p>
							</div>
						</div>
					</div>
				)}

				<div className="flex gap-3 mt-3">
					{loading ? (
						<div className="size-10 rounded-full bg-mono-200 animate-pulse" />
					) : (
						<Image
							src={imageUrl!}
							alt="Profile"
							height={40}
							width={40}
							className="rounded-full size-10"
						/>
					)}

					<div className="flex flex-col flex-1">
						<span className="text-white font-semibold">{user?.handle}</span>
						<TextArea
							value={text}
							onChange={(e) => setText(e.target.value)}
							className="w-full resize-none overflow-hidden text-mono-200
					placeholder:text-[var(--color-500)] border-none focus:outline-none whitespace-pre-wrap"
							placeholder={`${parent ? "Reply to post" : "What's happening?"}`}
						/>
					</div>
				</div>
			</div>

			{/* Footer */}
			<div className="flex items-center justify-between px-4 py-3 sm:px-6 border-t border-[var(--color-700)]">
				<div className="flex gap-4 text-sm text-mono-300 items-center">
					<button className="hover:text-mono-100" disabled>
						Image
					</button>
					<button className="hover:text-mono-100" disabled>
						GIF
					</button>
				</div>
				<div className="flex gap-4 text-sm text-mono-300 items-center">
					{overflowCount > 0 && (
						<span className="text-red-500 font-semibold text-sm">-{overflowCount}</span>
					)}

					<button
						onClick={handlePost}
						disabled={!canPost}
						className={`text-sm font-semibold px-4 py-2 rounded-full transition cursor-pointer ${
							canPost
								? "bg-white text-black hover:bg-mono-200"
								: "bg-mono-800 text-mono-400 cursor-not-allowed"
						}`}
					>
						Post
					</button>
				</div>
			</div>
		</Popup>
	);
}
