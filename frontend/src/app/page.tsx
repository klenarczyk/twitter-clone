'use client';

import {useEffect, useState} from "react";
import PostList from "@/components/post/PostList";
import PostComposer from "@/components/post/PostComposer";

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchPosts() {
            setLoading(true);
            try {
                const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/posts", {
                    credentials: "include",
                });
                if (!res.ok) {
                    throw new Error("Failed to fetch posts");
                }
                const data = await res.json();
                setPosts(data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchPosts();
    }, []);

    async function handleAddPost(content: string) {
        setLoading(true);
        try {
            const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/posts", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify({content}),
            });
            if (!res.ok) {
                alert("Failed to add post");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <div
                className="flex min-h-screen flex-col items-center justify-start py-8 w-[min(90%,32rem)]">
                <PostComposer onSubmit={handleAddPost}/>
                <PostList posts={posts}/>
            </div>
        </div>
    );
}
