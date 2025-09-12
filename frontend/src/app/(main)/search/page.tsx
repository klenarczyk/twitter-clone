"use client";

import React, { useEffect, useState } from "react";
import Container from "@/shared/components/ui/Container";
import BackHeader from "@/shared/components/ui/BackHeader";
import InfiniteProfileList from "@/features/profile/components/InfiniteProfileList";
import { Search } from "lucide-react";

export default function SearchPage() {
	const [query, setQuery] = useState("");
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		const handler = setTimeout(() => {
			setSearchTerm(query);
		}, 500);

		return () => clearTimeout(handler);
	}, [query]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setSearchTerm(query);
	};

	return (
		<div className="md:space-y-4 mb-14 md:mb-8 relative w-full max-w-2xl mx-auto">
			<BackHeader title="Search Users" />

			<form onSubmit={handleSubmit} className="px-4 py-2 relative">
				<input
					type="text"
					placeholder="Search users..."
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					className="text-white w-full bg-transparent border border-zinc-700 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-zinc-400 pr-10"
				/>
				<Search
					className="absolute right-7 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 cursor-pointer"
					onClick={handleSubmit}
				/>
			</form>

			<Container>
				{searchTerm ? (
					<InfiniteProfileList
						searchTerm={searchTerm}
						initialPageSize={8}
						className="py-2"
					/>
				) : (
					<div className="flex justify-center items-center h-64 text-zinc-400">
						Enter a search term to see profiles.
					</div>
				)}
			</Container>
		</div>
	);
}
