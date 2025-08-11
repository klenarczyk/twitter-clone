import {Post} from "@/types/components/post";
import PostCard from "@/components/post/PostCard";

export default function PostList({posts}: { posts: Post[] }) {
    if (!posts.length) return <p className="text-gray-500">No posts here yet.</p>;

    return (
        <div className="flex flex-col gap-4">
            {posts.map((post) => (
                <PostCard key={post.id} post={post}/>
            ))}
        </div>
    )
}