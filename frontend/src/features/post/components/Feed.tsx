"use client";

import InfinitePostList from "@/features/post/components/InfinitePostList";
import {motion} from "framer-motion";
import {useState} from "react";
import {useAuth} from "@/features/auth/hooks/useAuth";
import Link from "next/link";

export default function Feed({userId, initialPageSize = 8}: {
    userId?: number;
    initialPageSize?: number
}) {
    const {user, loading: loadingUser} = useAuth();
    const [activeTab, setActiveTab] = useState<"home" | "following">("home");

    if (loadingUser) {
        return (
            <div className="flex justify-center items-center h-64">
                <div
                    className="animate-spin rounded-full h-10 w-10 border-4 border-zinc-600 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="md:space-y-4 mb-14 md:mb-8 relative">
            {/* Desktop */}
            <div className="hidden md:flex sticky top-14 md:top-4 z-10 justify-center">
                <div
                    className={`relative inline-flex ${user ? "gap-0" : "gap-2"} items-center bg-zinc-900 rounded-full py-1 shadow-md md:bg-transparent md:shadow-none`}>
                    <motion.div
                        layout
                        className={`${user ? "block" : "hidden"} absolute top-1 bottom-1 w-1/2 rounded-full bg-zinc-700`}
                        initial={false}
                        animate={{x: activeTab === "home" || !user ? "0%" : "100%"}}
                        transition={{type: "spring", stiffness: 300, damping: 30}}
                    />

                    <button
                        onClick={() => setActiveTab("home")}
                        className={`${user ? "bg-transparent" : "bg-zinc-700"} z-10 w-24 text-sm font-medium py-2 rounded-full transition cursor-pointer ${
                            activeTab === "home" ? "text-white" : "text-zinc-400 hover:text-zinc-200"
                        }`}
                    >
                        Home
                    </button>

                    {user ? (
                        <button
                            onClick={() => setActiveTab("following")}
                            className={`z-10 w-24 text-sm font-medium py-2 rounded-full transition cursor-pointer ${
                                activeTab === "following" ? "text-white" : "text-zinc-400 hover:text-zinc-200"
                            }`}
                        >
                            Following
                        </button>
                    ) : (
                        <Link
                            href="/login"
                            className="z-10 w-24 text-sm font-medium py-2 rounded-full transition cursor-pointer bg-white text-black text-center"
                        >
                            Log in
                        </Link>
                    )}
                </div>
            </div>

            {/* Mobile */}
            <div className="md:hidden flex mb-4 sticky top-14 z-10 bg-mono-950">
                {user ? (
                    <>
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
                    </>
                ) : (
                    <div className="flex w-full justify-center gap-2 py-2">
                        <Link
                            href="/login"
                            className="w-24 text-sm font-medium py-2 rounded-full bg-white text-black text-center"
                        >
                            Log in
                        </Link>
                        <Link
                            href="/register"
                            className="w-24 text-sm font-medium py-2 rounded-full bg-zinc-700 text-white text-center"
                        >
                            Register
                        </Link>
                    </div>
                )}
            </div>

            <div className="md:bg-zinc-900 rounded-2xl shadow-sm md:border md:border-zinc-800 px-2 md:mt-8">
                <main className="w-full max-w-2xl mx-auto">
                    <InfinitePostList userId={userId} initialPageSize={initialPageSize}/>
                </main>
            </div>
        </div>
    );
}
