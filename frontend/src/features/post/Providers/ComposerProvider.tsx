"use client";

import { motion } from "framer-motion";
import React, { createContext, ReactNode, useState } from "react";

import Composer from "@/features/post/components/Composer";
import { Post } from "@/features/post/types/post";
import { useAuth } from "@/features/auth/providers/AuthProvider";

type ComposerContextType = {
	isOpen: boolean;
	parentPost: Post | null;
	openComposer: (parent?: Post) => void;
	closeComposer: () => void;
};

export const ComposerContext = createContext<ComposerContextType | undefined>(undefined);

export const ComposerProvider = ({ children }: { children: ReactNode }) => {
	const { user } = useAuth();
	const [isOpen, setIsOpen] = useState(false);
	const [parentPost, setParentPost] = useState<Post | null>(null);

	const openComposer = (parent?: Post) => {
		setParentPost(parent ?? null);
		setIsOpen(true);
	};

	const closeComposer = () => {
		setParentPost(null);
		setIsOpen(false);
	};

	return (
		<ComposerContext.Provider value={{ isOpen, parentPost, openComposer, closeComposer }}>
			{children}

			{isOpen && user && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 bg-black/50 flex items-center justify-center z-[150]"
					onClick={(e) => {
						if (e.target === e.currentTarget) {
							setIsOpen(false);
						}
					}}
				>
					{/* Mobile */}
					<motion.div
						initial={{ y: "100%" }}
						animate={{ y: 0 }}
						exit={{ y: "100%" }}
						transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
						className="md:hidden w-full h-full bg-zinc-900"
					>
						<Composer parent={parentPost} onClose={() => setIsOpen(false)} />
					</motion.div>

					{/* Desktop */}
					<motion.div
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.9, opacity: 0 }}
						transition={{ type: "spring", stiffness: 300, damping: 25 }}
						className="hidden md:flex flex-col w-11/12 max-w-2xl max-h-[90vh] h-full rounded-2xl bg-zinc-900"
					>
						<div className="flex flex-col h-full">
							<Composer parent={parentPost} onClose={() => setIsOpen(false)} />
						</div>
					</motion.div>
				</motion.div>
			)}
		</ComposerContext.Provider>
	);
};
