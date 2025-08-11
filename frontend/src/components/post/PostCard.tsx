import {Post} from "@/types/components/post";
import Image from "next/image";

export default function PostCard({post}: { post: Post }) {
    return (
        <div
            className="border border-[var(--color-bg-light)] rounded-md p-4 background-dark shadow-sm w-[min(100vw,480px)] flex gap-3">
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
                    <p className="text-scale-4">{post.author.fullName}</p>
                    <p className="text-scale-2">@{post.author.handle}</p>
                    <p className="text-scale-2 mx-1">•</p>
                    <p className="text-scale-2">Sep 14</p>
                </div>

                <p className="text-scale-3">{post.content}</p>
            </div>
        </div>

    )
}