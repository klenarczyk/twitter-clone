"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAuth } from "@/features/auth/context/AuthContext";

export default function useRequireAuth() {
	const { user, loading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!loading && !user) {
			router.push("/login");
		}
	}, [user, loading, router]);

	return { user, loading };
}
