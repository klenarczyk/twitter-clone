import Feed from "@/features/post/components/Feed";
import Composer from "@/features/post/components/Composer";

export default function HomePage() {
    return (
        <main className="lg:col-span-2 flex flex-col gap-6">
            <Composer/>
            <Feed initialPageSize={8}/>
        </main>
    );
}