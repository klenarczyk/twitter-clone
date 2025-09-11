"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { followUser, unfollowUser } from "@/features/profile/api/profileApi";
import { useFollow } from "@/features/profile/providers/FollowProvider";
import type { Profile } from "@/features/profile/types/user";
import { getProfileImage } from "@/features/profile/utils/getProfileImage";
import { formatNumber } from "@/shared/utils/formatNumber";

export function ProfileHeader({ profile }: { profile: Profile }) {
	const { following, toggleFollow } = useFollow();
	const isFollowing = following[profile.id] ?? false;

	const [followerCount, setFollowerCount] = useState(profile.followerCount || 0);

	const handleFollowToggle = async () => {
		if (isFollowing) {
			await unfollowUser(profile.id);
			setFollowerCount((c) => c - 1);
		} else {
			await followUser(profile.id);
			setFollowerCount((c) => c + 1);
		}

		toggleFollow(profile.id);
	};

	const imageUrl = getProfileImage(profile?.imageUrl);
	const isCurrentUser = false;

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
							<button className="px-4 py-2 rounded-xl bg-zinc-800 text-white hover:bg-zinc-700 transition">
								Edit Profile
							</button>
						) : (
							<button
								onClick={handleFollowToggle}
								className={`px-4 py-2 rounded-xl transition ${
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
