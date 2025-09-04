import {motion} from "framer-motion";

export function PostSkeleton() {
    return (
        <motion.article
            initial={{opacity: 0, y: 6}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.18}}
            className="bg-mono-950 border-b border-[var(--color-600)] p-4 shadow-sm animate-pulse"
        >
            <div className="flex gap-3">
                <div className="w-12 h-12 rounded-full bg-mono-800"/>
                <div className="flex-1 space-y-2">
                    <div className="h-3 bg-mono-800 rounded w-1/4"/>
                    <div className="h-3 bg-mono-800 rounded w-1/2"/>
                    <div className="h-3 bg-mono-800 rounded w-3/4 mt-2"/>
                </div>
            </div>
        </motion.article>
    );
}
