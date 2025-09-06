import PostCard from "@/features/post/components/PostCard";
import { Post } from "@/features/post/types/post";

export default function PostList({ posts, loading }: { posts: Post[]; loading?: boolean }) {
	if (loading) return null;

	if (!posts.length) return <p className="text-mono-500">No posts here yet.</p>;

	return (
		<div className="flex flex-col w-full">
			{posts.map((post, key) => (
				<PostCard key={key} post={post} />
			))}
		</div>
	);
}
