import {Post} from "@/types/components/post";
import PostCard from "@/components/post/PostCard";

export default function PostList({posts, loading}: { posts: Post[], loading?: boolean }) {
    if (loading) return null;
    if (!posts.length) return <p className="text-mono-500">No posts here yet.</p>;

    return (
        <div className="flex flex-col w-full">
            {posts.map((post) => (
                <PostCard key={post.id} post={post}/>
            ))}
        </div>
    )
}