"use client";

import Image from "next/image";
import React from "react";

import { Profile } from "@/features/profile/types/user";
import { getProfileImage } from "@/features/profile/utils/getProfileImage";

export default function ProfileCard({ profile }: { profile: Profile }) {
	const imageUrl = getProfileImage(profile.imageUrl);

	return (
		<div className="flex items-center gap-x-4 p-3 rounded-lg hover:bg-zinc-800 cursor-pointer">
			<Image
				src={imageUrl!}
				alt={profile.handle}
				width={48}
				height={48}
				className="size-12 rounded-full object-cover"
			/>
			<div className="flex flex-col">
				<span className="font-semibold text-white">{profile.fullName}</span>
				<span className="text-sm text-zinc-400">@{profile.handle}</span>
			</div>
		</div>
	);
}
