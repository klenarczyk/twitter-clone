import Feed from "@/features/post/components/Feed";

export default function HomePage() {
    return (
        <div className="lg:col-span-2 flex justify-center">
            <main className="w-full max-w-2xl">
                <Feed/>
            </main>
        </div>
    );
}