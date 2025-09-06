"use client";

import InfinitePostList from "@/features/post/components/InfinitePostList";
import {motion} from "framer-motion";
import {useState} from "react";

export default function Feed({userId, initialPageSize = 8}: {
    userId?: number;
    initialPageSize?: number
}) {
    const [activeTab, setActiveTab] = useState<"home" | "following">("home");

    return (
        <div className="md:space-y-4 mb-14">
            {/* Desktop */}
            <div className="hidden md:flex sticky top-14 md:top-4 z-10 justify-center">
                <div
                    className="relative inline-flex items-center bg-zinc-900 rounded-full py-1 shadow-md md:bg-transparent md:shadow-none">
                    <motion.div
                        layout
                        className="absolute top-1 bottom-1 w-1/2 rounded-full bg-zinc-700"
                        initial={false}
                        animate={{x: activeTab === "home" ? "0%" : "100%"}}
                        transition={{type: "spring", stiffness: 300, damping: 30}}
                    />

                    <button
                        onClick={() => setActiveTab("home")}
                        className={`relative z-10 w-24 text-sm font-medium py-2 rounded-full transition cursor-pointer ${
                            activeTab === "home" ? "text-white" : "text-zinc-400 hover:text-zinc-200"
                        }`}
                    >
                        Home
                    </button>

                    <button
                        onClick={() => setActiveTab("following")}
                        className={`relative z-10 w-24 text-sm font-medium py-2 rounded-full transition cursor-pointer ${
                            activeTab === "following" ? "text-white" : "text-zinc-400 hover:text-zinc-200"
                        }`}
                    >
                        Following
                    </button>
                </div>
            </div>

            {/* Mobile */}
            <div className="md:hidden flex mb-4 sticky top-14 z-10 bg-mono-950">
                <button
                    onClick={() => setActiveTab("home")}
                    className={`w-1/2 py-3 text-center font-medium border-b ${
                        activeTab === "home" ? "border-b-white text-white" : "border-b-[var(--color-800)] text-zinc-400"
                    }`}
                >
                    Home
                </button>
                <button
                    onClick={() => setActiveTab("following")}
                    className={`w-1/2 py-3 text-center font-medium border-b ${
                        activeTab === "following" ? "border-b-white text-white" : "border-b-[var(--color-800)] text-zinc-400"
                    }`}
                >
                    Following
                </button>
            </div>

            <div className="md:bg-zinc-900 rounded-2xl shadow-sm md:border md:border-zinc-800 px-2 md:mt-8">
                <main className="w-full max-w-2xl mx-auto">
                    <InfinitePostList userId={userId} initialPageSize={initialPageSize}/>
                </main>
            </div>
        </div>

    );
}
