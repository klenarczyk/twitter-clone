"use client";

import Feed from '../../features/post/components/Feed';
import Suggested from '../../features/post/components/Suggested';
import Composer from '../../features/post/components/Composer';
import {useToast} from "@/shared/toast/useToast";
import {useState} from "react";

export default function HomePage() {
    const {addToast} = useToast();
    const [count, setCount] = useState(0);
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <main className="lg:col-span-2 flex flex-col gap-6">
                <Composer/>
                <Feed initialPageSize={8}/>
            </main>

            <aside className="hidden lg:block">
                <Suggested/>
            </aside>

            <button
                className="fixed right-5 bottom-5 z-10 bg-white text-black h-8"
                onClick={() => {
                    addToast({
                        title: "Hello!",
                        description: `Toast count: ${count + 1}`,
                        type: "default",
                    });
                    setCount(count + 1);
                }}
            >
                Show Toast
            </button>
        </div>
    );
}