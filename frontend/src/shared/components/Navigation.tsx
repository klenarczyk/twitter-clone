"use client";

import { motion } from "framer-motion";
import { BellIcon, HomeIcon, MenuIcon, PlusIcon, SearchIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import { useAuth } from "@/features/auth/hooks/useAuth";
import Composer from "@/features/post/components/Composer";

export default function Navigation({ children }: { children: React.ReactNode }) {
	const { user, loading: loadingUser } = useAuth();
	const [composerOpen, setComposerOpen] = useState(false);

	const navItems = [
		{ name: "Home", href: "/", icon: <HomeIcon className="size-6" /> },
		{ name: "Search", href: "/#", icon: <SearchIcon className="size-6" /> },
		{
			name: "Add",
			href: "/#",
			icon: (
				<PlusIcon
					className="size-6 text-white bg-blue-600 p-1 rounded-full"
					onClick={() => setComposerOpen(true)}
				/>
			),
		},
		{ name: "Notifications", href: "/#", icon: <BellIcon className="size-6" /> },
		{
			name: "Profile",
			href: loadingUser ? "#" : user ? `/u/${user.handle}` : "/login",
			icon: <UserIcon className="size-6" />,
		},
	];

	return (
		<>
			<div className="flex-1 flex min-h-screen">
				<nav className="hidden md:flex flex-col justify-between w-20 h-screen bg-mono-950 border-r border-[var(--color-800)] px-2 fixed top-0 left-0">
					<div className="flex items-center justify-center mt-6">
						<Link href="/">
							<Image
								src="/images/logo.png"
								alt="Logo"
								width={40}
								height={40}
								className="invert object-contain"
								priority
							/>
						</Link>
					</div>

					<div className="flex flex-col items-center gap-8">
						{navItems.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className="text-gray-400 hover:text-white transition-colors"
							>
								{item.icon}
							</Link>
						))}
					</div>

					<div className="flex justify-center mb-6">
						<button className="text-gray-400 hover:text-white transition-colors cursor-pointer">
							<MenuIcon className="size-5" />
						</button>
					</div>
				</nav>

				<main className="flex-1 md:ml-20 min-h-screen w-auto">
					<div className="md:hidden fixed top-0 left-0 right-0 h-14 flex items-center justify-center py-4 bg-mono-950 z-10">
						<Link href="/">
							<Image
								src="/images/logo.png"
								alt="Logo"
								width={40}
								height={40}
								className="invert object-contain"
								priority
							/>
						</Link>
						<button className="absolute left-4 text-gray-400 hover:text-white transition-colors cursor-pointer">
							<MenuIcon className="size-6" />
						</button>
					</div>

					<div className="pt-14 md:pt-0 w-auto">{children}</div>

					<nav className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-mono-950 border-t border-[var(--color-800)] flex justify-around py-2">
						{navItems.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className="text-gray-400 hover:text-white p-2"
							>
								{item.icon}
							</Link>
						))}
					</nav>
				</main>
			</div>

			{composerOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
				>
					<Composer onClose={() => setComposerOpen(false)} />
				</motion.div>
			)}
		</>
	);
}
