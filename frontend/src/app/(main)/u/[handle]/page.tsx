'use client';

import {useParams} from "next/navigation";
import Image from "next/image";
import Feed from "@/features/post/components/Feed";
import {useProfileImage} from "@/features/profile/hooks/useProfileImage";
import {useProfile} from "@/features/profile/hooks/useProfile";

export default function ProfilePage() {
    const params = useParams();
    const {profile, loading: loadingProfile} = useProfile(params?.handle as string);
    const {imageUrl} = useProfileImage(profile?.handle);

    if (loadingProfile) return <div className="text-white">Loading...</div>;

    if (!profile) return <div className="text-white">Profile not found</div>;

    return (
        <div className="w-clamped">
            <div className="flex items-start justify-center gap-6 border-b border-[var(--color-500)] pb-4 mb-6">
                <div className="flex justify-start w-32 h-32 relative">
                    <Image
                        src={imageUrl}
                        alt="Profile picture"
                        width={500}
                        height={500}
                        priority={true}
                        className="rounded-full object-cover cursor-pointer"
                    />
                </div>
                <div className="flex-1">
                    <p className="font-bold text-xl text-mono-100">{profile.fullName}</p>
                    <p className="text-mono-500 font-semibold">@{profile.handle}</p>
                    <div className="flex gap-6 mt-3 text-mono-300 font-semibold">
                        <span>X Followers</span>
                        <span>Y Following</span>
                        <span>Z Posts</span>
                    </div>
                    <p className="my-4 text-mono-100">{profile.bio}</p>
                </div>
            </div>

            <div className="flex justify-center">
                <Feed userId={profile.id} initialPageSize={8} className="w-full"/>
            </div>

        </div>
    );
}