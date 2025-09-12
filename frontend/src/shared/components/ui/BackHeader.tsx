"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackHeader({ title = "Page" }: { title: string }) {
	const router = useRouter();

	return (
		<div className="hidden md:flex sticky top-14 md:top-4 z-10 items-center px-4 py-1">
			<button
				onClick={() => router.back()}
				className="p-2 rounded-full transition cursor-pointer"
			>
				<ChevronLeft className="text-white hover:text-zinc-400 transition-colors" />
			</button>

			<button
				onClick={(e) => {
					e.preventDefault();
					window.scrollTo({ top: 0, behavior: "smooth" });
				}}
				className="flex-1 text-center cursor-pointer"
			>
				<h1 className="text-lg font-semibold text-white">{title}</h1>
			</button>

			<div className="w-9" />
		</div>
	);
}
