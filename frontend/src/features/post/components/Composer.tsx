'use client';

import React, {useState} from 'react';
import Image from "next/image";
import {createPost} from "@/lib/api";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useProfileImage} from "@/features/profile/hooks/useProfileImage";
import {useAuth} from "@/features/auth/hooks/useAuth";

export default function Composer() {
    const router = useRouter();
    const [text, setText] = useState('');
    const {user, loading: loadingUser} = useAuth();
    const {imageUrl, loading: loadingImage} = useProfileImage(loadingUser ? undefined : user?.handle);

    const canPost = text.trim().length > 0;

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
                <Link href={`/u/${user?.handle}`} className="w-12 h-12 rounded-full">
                    <Image src={imageUrl} alt="Profile" height={50} width={50}
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
