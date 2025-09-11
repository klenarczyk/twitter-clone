"use client";

import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

import InfinitePostList from "@/features/post/components/InfinitePostList";
import { useProfile } from "@/features/profile/hooks/useProfile";
import { getProfileImage } from "@/features/profile/utils/getProfileImage";

export default function ProfilePage() {
	const params = useParams();
	const { profile, loading } = useProfile(params?.handle as string);
	const imageUrl = getProfileImage(profile?.imageUrl, loading);

	if (loading) {
		return (
			<div className="flex justify-center items-center h-64">
				<div className="animate-spin rounded-full h-10 w-10 border-4 border-zinc-600 border-t-transparent"></div>
			</div>
		);
	}

	if (!profile) {
		return (
			<div className="flex justify-center items-center h-64">
				<p className="text-zinc-400">Profile not found</p>
			</div>
		);
	}

	return (
		<div className="md:space-y-4 mb-14 md:mb-8 relative w-full max-w-2xl mx-auto">
			<div className="hidden md:flex sticky top-14 md:top-4 z-10 items-center px-4 py-1 mb-8">
				<button
					onClick={() => window.history.back()}
					className="p-2 rounded-full transition cursor-pointer"
				>
					<ChevronLeft className="text-white hover:text-zinc-400 transition-colors" />
				</button>

				<button
					onClick={(e) => {
						e.preventDefault();
						window.scrollTo({ top: 0, behavior: "smooth" });
					}}
					className="flex-1 text-center cursor-pointer"
				>
					<h1 className="text-lg font-semibold text-white">{profile.handle}</h1>
				</button>

				<div className="w-9" />
			</div>

			{/* Profile Header */}
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
							<span>X Followers</span>
							<span>Y Following</span>
							<span>Z Posts</span>
						</div>
						<p className="mt-4 text-zinc-200">{profile.bio}</p>
					</div>
				</div>
			</div>

			{/* Posts */}
			<div className="md:bg-zinc-900 rounded-2xl shadow-sm md:border md:border-zinc-800 md:mt-4 pt-2">
				<main className="w-full max-w-2xl mx-auto">
					<InfinitePostList authorId={profile.id} initialPageSize={8} />
				</main>
			</div>
		</div>
	);
}
