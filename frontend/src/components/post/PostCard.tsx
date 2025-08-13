import {Post} from "@/types/components/post";
import Image from "next/image";

export default function PostCard({post}: { post: Post }) {
    return (
        <div
            className="border-b border-[var(--color-500)] p-4 bg-mono-950 shadow-sm w-full flex gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden select-none relative">
                <Image
                    src="/images/default-user.jpg"
                    alt="Profile picture"
                    layout="fill"
                    objectFit="cover"
                    priority={true}
                />
            </div>

            <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                    <p className="text-base text-mono-100">{post.author.fullName}</p>
                    <p className="text-base text-mono-500">@{post.author.handle}</p>
                    <p className="text-base text-mono-500 mx-1">•</p>
                    <p className="text-base text-mono-500">Sep 14</p>
                </div>

                <p className="text-base text-mono-50">{post.content}</p>
            </div>
        </div>
    )
}