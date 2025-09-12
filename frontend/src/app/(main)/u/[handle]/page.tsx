"use client";

import { useParams } from "next/navigation";

import InfinitePostList from "@/features/post/components/InfinitePostList";
import ProfileHeader from "@/features/profile/components/ProfileHeader";
import { useProfile } from "@/features/profile/hooks/useProfile";
import BackHeader from "@/shared/components/ui/BackHeader";
import Container from "@/shared/components/ui/Container";

export default function ProfilePage() {
	const params = useParams();
	const { profile, loading } = useProfile(params?.handle as string);

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
			<BackHeader title={profile.handle} />

			<ProfileHeader profile={profile} />

			<Container>
				<InfinitePostList authorId={profile.id} initialPageSize={8} />
			</Container>
		</div>
	);
}
