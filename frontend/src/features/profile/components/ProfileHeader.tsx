"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

import { useAuth } from "@/features/auth/context/AuthContext";
import { followUser, unfollowUser } from "@/features/profile/api/profileApi";
import EditProfileModal from "@/features/profile/components/EditProfileModal";
import type { Profile } from "@/features/profile/types/user";
import { getProfileImage } from "@/features/profile/utils/getProfileImage";
import { ApiError } from "@/lib/api/httpTypes";
import Container from "@/shared/components/ui/Container";
import { useToast } from "@/shared/toast/ToastContext";
import { formatNumber } from "@/shared/utils/formatNumber";

export default function ProfileHeader({ profile }: { profile: Profile }) {
	const { user } = useAuth();
	const { addToast } = useToast();

	const [isFollowing, setIsFollowing] = useState(profile.isFollowed || false);
	const [followerCount, setFollowerCount] = useState(profile.followerCount || 0);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isOverflowing, setIsOverflowing] = useState(false);
	const [expanded, setExpanded] = useState(false);

	const bioRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (bioRef.current) {
			setIsOverflowing(bioRef.current.scrollHeight > bioRef.current.clientHeight);
		}
	}, [profile.bio]);

	useEffect(() => {
		setFollowerCount(profile.followerCount || 0);
	}, [profile]);

	const handleFollowToggle = async () => {
		try {
			if (isFollowing) {
				await unfollowUser(profile.id);
				setIsFollowing(false);
				setFollowerCount((c) => c - 1);
			} else {
				await followUser(profile.id);
				setIsFollowing(true);
				setFollowerCount((c) => c + 1);
			}
		} catch (err) {
			if (err instanceof ApiError) {
				addToast({ type: "error", text: err.details?.issue || "Error" });
			} else {
				addToast({ type: "error", text: "An unknown error occurred. Please try again." });
			}
		}
	};

	const imageUrl = getProfileImage(profile?.imageUrl);
	const isCurrentUser = profile.id === user?.id;

	return (
		<Container className="pt-6 pb-4 px-6">
			<div className="flex items-start gap-6">
				<div className="w-24 h-24 relative">
					{!imageUrl ? (
						<div className="w-10 h-10 border-4 border-t-4 border-zinc-600 border-t-zinc-200 rounded-full animate-spin mx-auto" />
					) : (
						<Image
							src={imageUrl}
							alt="Profile picture"
							width={96}
							height={96}
							className="rounded-full object-cover"
							priority
						/>
					)}
				</div>

				<div className="flex-1">
					<p className="font-bold text-xl text-white">{profile.fullName}</p>
					<p className="text-zinc-400 font-medium">@{profile.handle}</p>
					<div className="flex gap-6 mt-3 text-zinc-300 font-medium">
						<span className="text-center">{formatNumber(followerCount)} Followers</span>
						<span className="text-center">
							{formatNumber(profile.followingCount)} Following
						</span>
						<span className="text-center">{formatNumber(profile.postCount)} Posts</span>
					</div>

					<div className="mt-4">
						{isCurrentUser ? (
							<button
								onClick={() => setIsModalOpen(true)}
								className="px-4 py-2 rounded-xl bg-zinc-800 text-white hover:bg-zinc-700 transition cursor-pointer"
							>
								Edit Profile
							</button>
						) : (
							<button
								onClick={handleFollowToggle}
								className={`px-4 py-2 rounded-xl transition cursor-pointer ${
									isFollowing
										? "bg-zinc-700 text-white hover:bg-zinc-600"
										: "bg-white text-black hover:bg-zinc-200"
								}`}
							>
								{isFollowing ? "Unfollow" : "Follow"}
							</button>
						)}
					</div>
				</div>
			</div>

			<p
				id={profile.id.toString()}
				ref={bioRef}
				className={`mt-4 text-sm text-mono-100 leading-6 whitespace-pre-wrap ${
					!expanded ? "line-clamp-4 overflow-hidden" : ""
				}`}
			>
				{profile.bio}
			</p>

			{isOverflowing && (
				<button
					className="text-sm text-[var(--color-500)] mt-1 cursor-pointer"
					onClick={() => setExpanded(!expanded)}
				>
					{expanded ? "Show less" : "Show more"}
				</button>
			)}

			<EditProfileModal
				profile={profile}
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>
		</Container>
	);
}
