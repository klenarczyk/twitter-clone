"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { followUser, unfollowUser } from "@/features/profile/api/profileApi";
import type { Profile } from "@/features/profile/types/user";
import { getProfileImage } from "@/features/profile/utils/getProfileImage";
import { formatNumber } from "@/shared/utils/formatNumber";
import { useToast } from "@/shared/toast/useToast";
import { ApiError } from "@/lib/api/httpTypes";
import { useAuth } from "@/features/auth/providers/AuthProvider";

export function ProfileHeader({ profile }: { profile: Profile }) {
	const { user } = useAuth();
	const [isFollowing, setIsFollowing] = useState(profile.isFollowed || false);
	const { addToast } = useToast();

	const [followerCount, setFollowerCount] = useState(profile.followerCount || 0);

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
				switch (err.status) {
					case 409: {
						addToast({
							type: "error",
							text: err.details!.issue,
						});
						break;
					}
					default: {
						addToast({
							type: "error",
							text: "An unknown error occurred. Please try again.",
						});
						break;
					}
				}
			} else {
				addToast({
					type: "error",
					text: "An unknown error occurred. Please try again.",
				});
			}
		}
	};

	const imageUrl = getProfileImage(profile?.imageUrl);
	const isCurrentUser = profile.id === user?.id;

	useEffect(() => {
		setFollowerCount(profile.followerCount || 0);
	}, [profile]);

	return (
		<div className="md:bg-zinc-900 rounded-2xl shadow-sm md:border md:border-zinc-800 pt-6 pb-4 px-6">
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
						/>
					)}
				</div>

				<div className="flex-1">
					<p className="font-bold text-xl text-white">{profile.fullName}</p>
					<p className="text-zinc-400 font-medium">@{profile.handle}</p>
					<div className="flex gap-6 mt-3 text-zinc-300 font-medium">
						<span>{formatNumber(followerCount)} Followers</span>
						<span>{formatNumber(profile.followingCount)} Following</span>
						<span>{formatNumber(profile.postCount)} Posts</span>
					</div>

					<div className="mt-4">
						{isCurrentUser ? (
							<button className="px-4 py-2 rounded-xl bg-zinc-800 text-white hover:bg-zinc-700 transition cursor-pointer">
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
			<p className="mt-4 text-zinc-200">{profile.bio}</p>
		</div>
	);
}
