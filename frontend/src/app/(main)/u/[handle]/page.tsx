'use client';

import {useParams} from "next/navigation";
import Image from "next/image";
import Feed from "@/features/post/components/Feed";
import {useProfile} from "@/features/profile/hooks/useProfile";
import {getProfileImage} from "@/features/profile/utils/getProfileImage";

export default function ProfilePage() {
    const params = useParams();
    const {profile, loading} = useProfile(params?.handle as string);
    const imageUrl = getProfileImage(profile?.imageUrl, loading);

    if (loading) return <div className="text-white">Loading...</div>;

    if (!profile) return <div className="text-white">Profile not found</div>;

    return (
        <div className="w-clamped">
            <div className="flex items-start justify-center gap-6 border-b border-[var(--color-500)] pb-4 mb-6">
                <div className="flex justify-start w-32 h-32 relative">
                    {loading || !imageUrl ?
                        <div
                            className="w-10 h-10 border-4 border-t-4 border-mono-600 border-t-mono-200 rounded-full animate-spin"/>
                        : <Image
                            src={imageUrl}
                            alt="Profile picture"
                            width={500}
                            height={500}
                            priority={true}
                            className="rounded-full object-cover cursor-pointer"
                        />
                    }
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