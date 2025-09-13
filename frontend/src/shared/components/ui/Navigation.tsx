"use client";

import {
	ChevronLeft,
	HomeIcon,
	LogInIcon,
	LogOutIcon,
	MenuIcon,
	PlusIcon,
	SearchIcon,
	UserIcon,
} from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

import { useAuth } from "@/features/auth/context/AuthContext";
import { useComposer } from "@/features/post/context/ComposerContext";

export default function Navigation({ children }: { children: React.ReactNode }) {
	const { user, logout, loading: loadingUser } = useAuth();
	const { openComposer } = useComposer();
	const path = usePathname();
	const router = useRouter();

	const [menuOpen, setMenuOpen] = useState(false);
	const desktopMenuRef = useRef<HTMLDivElement>(null);
	const mobileMenuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (
				desktopMenuRef.current &&
				!desktopMenuRef.current.contains(e.target as Node) &&
				mobileMenuRef.current &&
				!mobileMenuRef.current.contains(e.target as Node)
			) {
				setMenuOpen(false);
			}
		}

		if (menuOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [menuOpen]);

	const navItems = [
		{ name: "Home", href: "/", icon: <HomeIcon className="size-6" /> },
		{ name: "Search", href: "/search", icon: <SearchIcon className="size-6" /> },
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

	const renderItems = () => (
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

	const handleAuthAction = () => {
		if (user) {
			logout();
			window.location.reload();
		} else {
			router.push("/login");
		}
		setMenuOpen(false);
	};

	return (
		<div className="flex-1 flex min-h-screen">
			{/* Desktop */}
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
						<div className="relative size-10">
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

				<div
					className="relative flex justify-center mb-6"
					ref={desktopMenuRef}
					onClick={(e) => e.stopPropagation()}
				>
					<button
						onClick={(e) => {
							e.stopPropagation();
							setMenuOpen((p) => !p);
						}}
						className="text-gray-400 hover:text-white transition-colors cursor-pointer"
					>
						<MenuIcon className="size-5" />
					</button>

					{menuOpen && (
						<div className="absolute bottom-full mb-2 left-0 bg-mono-900 border border-[var(--color-800)] rounded-lg shadow-lg p-2 z-50">
							<button
								onClick={(e) => {
									e.stopPropagation();
									handleAuthAction();
								}}
								className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-mono-800 rounded-md w-full text-left cursor-pointer"
							>
								{user ? (
									<>
										<LogOutIcon className="size-4" /> Logout
									</>
								) : (
									<>
										<LogInIcon className="size-4" /> Login
									</>
								)}
							</button>
						</div>
					)}
				</div>
			</nav>

			{/* Main content */}
			<main className="flex-1 md:ml-20 min-h-screen w-auto">
				{/* Mobile top */}
				<div className="md:hidden fixed top-0 left-0 right-0 h-14 flex items-center justify-between px-4 bg-mono-950 z-50">
					{path !== "/" ? (
						<button
							onClick={() => window.history.back()}
							className="text-gray-400 hover:text-white transition-colors cursor-pointer"
						>
							<ChevronLeft className="size-6" />
						</button>
					) : (
						<div className="w-6" />
					)}

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
						<div className="relative size-10">
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

					<div className="relative" ref={mobileMenuRef}>
						<button
							onClick={() => setMenuOpen((p) => !p)}
							className="text-gray-400 hover:text-white transition-colors cursor-pointer"
						>
							<MenuIcon className="size-6" />
						</button>

						{menuOpen && (
							<div className="absolute top-full mt-2 right-0 bg-mono-900 border border-[var(--color-800)] rounded-lg shadow-lg p-2 z-50">
								<button
									onClick={(e) => {
										e.stopPropagation();
										handleAuthAction();
									}}
									className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-mono-800 rounded-md w-full text-left cursor-pointer"
								>
									{user ? (
										<>
											<LogOutIcon className="size-4" /> Logout
										</>
									) : (
										<>
											<LogInIcon className="size-4" /> Login
										</>
									)}
								</button>
							</div>
						)}
					</div>
				</div>

				<div className="pt-14 md:pt-0 w-auto">{children}</div>

				{/* Mobile bottom */}
				<nav className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-mono-950 border-t border-[var(--color-800)] flex justify-around py-2">
					{renderItems()}
				</nav>
			</main>
		</div>
	);
}
