'use client';

import React, {useEffect, useState} from 'react';
import Image from "next/image";
import {createPost, fetchCurrentUser} from "@/lib/api";
import {UserSummary} from "@/features/profile/types/user";
import Link from "next/link";
import {useRouter} from "next/navigation";

export default function Composer() {
    const router = useRouter();
    const [text, setText] = useState('');
    const [currentUser, setCurrentUser] = useState<UserSummary | null>(null);

    const pfpUrl = (currentUser && currentUser.profileImageUrl && currentUser.profileImageUrl.length > 0)
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${currentUser.profileImageUrl}`
        : '/images/default-user.jpg';

    const canPost = text.trim().length > 0;

    useEffect(() => {
        async function loadCurrentUser() {
            try {
                const user = await fetchCurrentUser();
                setCurrentUser(user);
            } catch (error) {
                console.error('Failed to fetch current user:', error);
            }
        }

        loadCurrentUser();
    }, [])

    async function handlePost() {
        if (!canPost) return;
        try {
            await createPost(text);
        } catch (e: unknown) {
            console.log(e);
        } finally {
            setText('');
            router.refresh();
        }
    }

    return (
        <div className="bg-mono-950 border-b border-[var(--color-500)] p-4 shadow-sm">
            <div className="flex gap-3">
                <Link href={`/u/${currentUser?.handle}`} className="w-12 h-12 rounded-full">
                    <Image src={pfpUrl} alt="Profile" height={50} width={50}
                           className="rounded-full cursor-pointer"/>
                </Link>
                <div className="flex-1">
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        rows={text.length > 0 ? 4 : 2}
                        className="w-full resize-none text-mono-100 placeholder:text-[var(--color-500)] border-none focus:outline-none focus:ring-0"
                        placeholder="What's happening?"
                        aria-label="Compose post"
                    />

                    <div className="flex items-center justify-between mt-3">
                        <div className="flex gap-3 items-center text-sm">
                            <button
                                className="font-semibold px-2 py-1 text-mono-200 rounded hover:bg-[var(--color-800)] cursor-pointer">Image
                            </button>
                            <button
                                className="font-semibold px-2 py-1 text-mono-200 rounded hover:bg-[var(--color-800)] cursor-pointer">GIF
                            </button>
                        </div>
                        <div>
                            <button
                                onClick={handlePost}
                                disabled={!canPost}
                                className={`cursor-pointer px-4 py-2 rounded-2xl font-semibold ${canPost ? 'bg-blue-400' +
                                    ' text-white' : 'bg-mono-300 text-mono-100'}`}>
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
