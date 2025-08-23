import Feed from '../../features/post/components/Feed';
import Suggested from '../../features/post/components/Suggested';
import Composer from '../../features/post/components/Composer';

export default function HomePage() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <main className="lg:col-span-2 flex flex-col gap-6">
                <Composer/>
                <Feed initialPageSize={8}/>
            </main>

            <aside className="hidden lg:block">
                <Suggested/>
            </aside>
        </div>
    );
}