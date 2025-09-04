import InfinitePostList from "@/features/post/components/InfinitePostList";

export default function Feed({initialPageSize = 8}: {
    initialPageSize?: number;
}) {
    return (
        <main className="w-full max-w-2xl mx-auto">
            <InfinitePostList initialPageSize={initialPageSize}/>
        </main>
    );
}
