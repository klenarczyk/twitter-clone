'use client';

import React, {useState} from 'react';
import Image from "next/image";
import {createPost} from "@/features/post/api/postApi";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useProfileImage} from "@/features/profile/hooks/useProfileImage";
import {useAuth} from "@/features/auth/hooks/useAuth";
import {ApiError} from "@/shared/api/httpTypes";
import {useToast} from "@/shared/toast/useToast";

export default function Composer() {
    const router = useRouter();
    const {addToast} = useToast();

    const {user, loading: loadingUser} = useAuth();
    const {imageUrl, loading: loadingImage} = useProfileImage(loadingUser ? undefined : user?.handle);

    const [text, setText] = useState('');

    const canPost = text.trim().length > 0;

    async function handlePost() {
        if (!canPost) return;
        try {
            await createPost(text);
            addToast({
                text: "Post created successfully!",
                type: "success"
            });
        } catch (err: unknown) {
            if (err instanceof ApiError) {
                switch (err.status) {
                    case 401:
                        addToast({
                            text: "Error: You must be logged in to post.",
                            type: "error"
                        });
                        break;
                    case 500:
                        addToast({
                            text: "Server error. Please try again later.",
                            type: "error"
                        });
                        break;
                    default:
                        addToast({
                            text: `Failed to create post: ${err.message}`,
                            type: "error"
                        });
                }
            } else {
                addToast({
                    text: "An unexpected error occurred. Please try again.",
                    type: "error"
                });
            }
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
