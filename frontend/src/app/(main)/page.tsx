import Feed from "@/features/post/components/Feed";

export default function MainPage() {
	return (
		<div className="w-full max-w-2xl mx-auto">
			<Feed initialPageSize={8} />
		</div>
	);
}
