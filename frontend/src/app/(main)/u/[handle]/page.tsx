"use client";

import { ChevronLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import InfinitePostList from "@/features/post/components/InfinitePostList";
import { ProfileHeader } from "@/features/profile/components/ProfileHeader";
import { useProfile } from "@/features/profile/hooks/useProfile";

export default function ProfilePage() {
	const params = useParams();
	const { profile, loading } = useProfile(params?.handle as string);
	const router = useRouter();

	if (loading) {
		return (
			<div className="flex justify-center items-center h-64">
				<p className="text-zinc-400">Loading...</p>
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
			{/* Top bar */}
			<div className="hidden md:flex sticky top-14 md:top-4 z-10 items-center px-4 py-1 mb-8">
				<button
					onClick={() => router.back()}
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

			<ProfileHeader profile={profile} />

			<div className="md:bg-zinc-900 rounded-2xl shadow-sm md:border md:border-zinc-800 md:mt-4 pt-2">
				<main className="w-full max-w-2xl mx-auto">
					<InfinitePostList authorId={profile.id} initialPageSize={8} />
				</main>
			</div>
		</div>
	);
}
