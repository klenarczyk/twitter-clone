'use client';

import React, {useEffect, useState} from "react";
import {Textarea} from "@/components/ui/TextArea";
import Image from "next/image";
import {fetchCurrentUser} from "@/lib/api";

interface PostComposerProps {
    onSubmit: (content: string) => Promise<void>;
    loading?: boolean;
    className?: string;
}

interface User {
    fullName: string;
    handle: string;
}

export default function PostComposer({onSubmit, loading, className}: PostComposerProps) {
    const [user, setUser] = useState<User>({
        fullName: "",
        handle: "",
    })
    const [content, setContent] = useState<string>("");
    const [loadingUser, setLoadingUser] = useState<boolean>(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const res = await fetchCurrentUser();
                if (res) {
                    setUser({
                        fullName: res.fullName,
                        handle: res.handle,
                    });
                }
            } finally {
                setLoadingUser(false);
            }
        };

        loadUser();
    }, []);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!content.trim()) return;
        await onSubmit(content);
        setContent("");
    }

    return (
        <form onSubmit={handleSubmit}
              className="flex border-b border-[var(--color-500)] p-4 shadow-sm w-full gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden select-none relative">
                <Image
                    src="/images/default-user.jpg"
                    alt="Profile picture"
                    layout="fill"
                    objectFit="cover"
                    priority={true}
                />
            </div>

            <div className={`grow border rounded-lg pb-4 pr-4 shadow-sm ${className}`}>
                <div className="flex items-center justify-between">
                    {loadingUser ? (
                        <div className="flex gap-1">
                            <div className="h-4 w-24 bg-mono-600 rounded animate-pulse"/>
                            <div className="h-4 w-16 bg-mono-600 rounded animate-pulse"/>
                        </div>
                    ) : (
                        <div className="flex gap-1">
                            <p className="text-base font-normal text-mono-50">{user.fullName}</p>
                            <p className="text-base font-normal text-mono-500">@{user.handle}</p>
                        </div>
                    )}

                    <div className="flex justify-end">
                        <button type="submit" disabled={loading || !content.trim()}
                                className="font-bold text-base text-blue-500 text-scale-4 hover:text-blue-600 cursor-pointer">
                            {loading ? "Posting..." : "Post"}
                        </button>
                    </div>
                </div>

                <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What's on your mind?"
                    className="w-full resize-none"
                    rows={3}
                />
            </div>
        </form>
    );
}