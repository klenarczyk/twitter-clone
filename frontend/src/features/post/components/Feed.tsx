import InfinitePostList from "@/features/post/components/InfinitePostList";

export default function Feed({userId, initialPageSize = 8}: {
    userId?: number;
    initialPageSize?: number
}) {
    return (
        <main className="w-full max-w-2xl mx-auto">
            <InfinitePostList userId={userId} initialPageSize={initialPageSize}/>
        </main>
    );
}
