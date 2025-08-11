'use client';

import React, {useState} from "react";
import Button from "@/components/ui/Button";
import {Textarea} from "@/components/ui/TextArea";

interface PostComposerProps {
    onSubmit: (content: string) => Promise<void>;
    loading?: boolean;
    className?: string;
}

export default function PostComposer({onSubmit, loading, className}: PostComposerProps) {
    const [content, setContent] = useState('');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!content.trim()) return;
        await onSubmit(content);
        setContent("");
    }

    return (
        <form onSubmit={handleSubmit}
              className={`border border-gray-300 rounded-lg p-4 bg-white shadow-sm ${className}`}>
            <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full resize-none"
                rows={3}
            />
            <div className="flex justify-end mt-2">
                <Button type="submit" disabled={loading || !content.trim()}>
                    {loading ? "Posting..." : "Post"}
                </Button>
            </div>
        </form>
    );
}