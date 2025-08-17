'use client';

import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {fetchUser} from "@/lib/api";
import {User} from "@/types/User";
import Image from "next/image";
import Feed from "@/components/post/Feed";

export default function ProfilePage() {
    const params = useParams();
    const handle = params.handle as string ?? '';
    const [user, setUser] = useState<User | null>(null);

    const pfpUrl = user?.profileImageUrl
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${user.profileImageUrl}`
        : '/images/default-user.jpg';

    useEffect(() => {
        async function loadData() {
            try {
                const userData = await fetchUser(handle);
                setUser(userData);
            } catch (err) {
                console.error(err);
            }
        }

        loadData();
    }, [handle]);

    if (!user) return <div>Loading...</div>;

    return (
        <div className="w-clamped">
            <div className="flex items-start justify-center gap-6 border-b border-[var(--color-500)] pb-4 mb-6">
                <div className="flex justify-start w-32 h-32 relative">
                    <Image
                        src={pfpUrl}
                        alt="Profile picture"
                        width={500}
                        height={500}
                        priority={true}
                        className="rounded-full object-cover cursor-pointer"
                    />
                </div>
                <div className="flex-1">
                    <p className="font-bold text-xl text-mono-100">{user.fullName}</p>
                    <p className="text-mono-500 font-semibold">@{user.handle}</p>
                    <div className="flex gap-6 mt-3 text-mono-300 font-semibold">
                        <span>X Followers</span>
                        <span>Y Following</span>
                        <span>Z Posts</span>
                    </div>
                    {user.bio && <p className="my-4 text-mono-100">{user.bio}</p>}
                </div>
            </div>

            <div className="flex justify-center">
                <Feed userId={user.id} initialPageSize={8} className="w-full"/>
            </div>

        </div>
    );
}