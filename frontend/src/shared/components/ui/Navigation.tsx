"use client";

import { ChevronLeft, HomeIcon, MenuIcon, PlusIcon, SearchIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

import { useAuth } from "@/features/auth/context/AuthContext";
import { useComposer } from "@/features/post/context/ComposerContext";

export default function Navigation({ children }: { children: React.ReactNode }) {
	const { user, loading: loadingUser } = useAuth();
	const { openComposer } = useComposer();
	const path = usePathname();
	const router = useRouter();

	const navItems = [
		{
			name: "Home",
			href: "/",
			icon: <HomeIcon className="size-6" />,
		},
		{
			name: "Search",
			href: "/search",
			icon: <SearchIcon className="size-6" />,
		},
		{
			name: "Add",
			href: loadingUser || user ? "#" : "/login",
			icon: <PlusIcon className="size-6 text-white bg-blue-600 p-1 rounded-full" />,
		},
		{
			name: "Profile",
			href: loadingUser ? "#" : user ? `/u/${user.handle}` : "/login",
			icon: <UserIcon className="size-6" />,
		},
	];

	const renderItems = () => {
		return (
			<>
				{navItems.map((item) => (
					<button
						key={item.name}
						onClick={(e) => {
							e.preventDefault();
							if (item.name === "Add" && user) {
								openComposer();
							} else if (item.href === path || item.href === "#") {
								window.scrollTo({ top: 0, behavior: "smooth" });
							} else {
								router.push(item.href);
							}
						}}
						className="text-gray-400 hover:text-white transition-colors cursor-pointer"
					>
						{item.icon}
					</button>
				))}
			</>
		);
	};

	return (
		<div className="flex-1 flex min-h-screen">
			<nav className="hidden md:flex flex-col justify-between w-20 h-screen bg-mono-950 border-r border-[var(--color-800)] px-2 fixed top-0 left-0">
				<div className="flex items-center justify-center mt-6">
					<button
						onClick={(e) => {
							e.preventDefault();
							if (path === "/") {
								window.scrollTo({ top: 0, behavior: "smooth" });
							} else {
								router.replace("/");
							}
						}}
						className="text-gray-400 hover:text-white transition-colors cursor-pointer"
					>
						<div className="relative w-10 h-10">
							<Image
								src="/images/logo.png"
								alt="Logo"
								fill
								sizes="40px"
								className="invert object-contain"
								priority
							/>
						</div>
					</button>
				</div>

				<div className="flex flex-col items-center gap-8">{renderItems()}</div>

				<div className="flex justify-center mb-6">
					<button className="text-gray-400 hover:text-white transition-colors cursor-pointer">
						<MenuIcon className="size-5" />
					</button>
				</div>
			</nav>

			<main className="flex-1 md:ml-20 min-h-screen w-auto">
				<div className="md:hidden fixed top-0 left-0 right-0 h-14 flex items-center justify-center py-4 bg-mono-950 z-10">
					{path !== "/" && (
						<button
							onClick={() => window.history.back()}
							className="absolute left-4 text-gray-400 hover:text-white transition-colors cursor-pointer"
						>
							<ChevronLeft className="size-6" />
						</button>
					)}
					<Link href="/public">
						<Image
							src="/images/logo.png"
							alt="Logo"
							width={40}
							height={40}
							className="invert object-contain"
							priority
						/>
					</Link>
					<button className="absolute right-4 text-gray-400 hover:text-white transition-colors cursor-pointer">
						<MenuIcon className="size-6" />
					</button>
				</div>

				<div className="pt-14 md:pt-0 w-auto">{children}</div>

				<nav className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-mono-950 border-t border-[var(--color-800)] flex justify-around py-2">
					{renderItems()}
				</nav>
			</main>
		</div>
	);
}
