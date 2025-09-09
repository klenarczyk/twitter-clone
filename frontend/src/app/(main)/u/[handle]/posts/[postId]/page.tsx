import { fetchPostById } from "@/features/post/api/postApi";
import PostReplies from "@/features/post/components/PostReplies";

export default async function PostPage({ params }: { params: Promise<{ postId: string }> }) {
	const { postId } = await params;
	const post = await fetchPostById(Number(postId));

	if (!post) return <div>Post not found.</div>;

	return (
		<div className="w-full max-w-2xl mx-auto">
			<PostReplies initialPageSize={8} post={post} />
		</div>
	);
}
