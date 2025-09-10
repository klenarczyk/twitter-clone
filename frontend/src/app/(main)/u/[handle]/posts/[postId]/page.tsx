import PostReplies from "@/features/post/components/PostReplies";

export default async function PostPage({ params }: { params: Promise<{ postId: number }> }) {
	const { postId } = await params;

	return (
		<div className="w-full max-w-2xl mx-auto">
			<PostReplies initialPageSize={8} postId={postId} />
		</div>
	);
}
