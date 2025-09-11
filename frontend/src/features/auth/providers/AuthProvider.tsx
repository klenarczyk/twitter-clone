"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

import { fetchCurrentUser } from "@/features/auth/api/authApi";
import { AuthContextType, User } from "@/features/auth/types/auth";
import { ApiError } from "@/lib/api/httpTypes";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const currentUser = await fetchCurrentUser();
				setUser(currentUser);
			} catch (err: unknown) {
				setUser(null);
				if (err instanceof ApiError) {
					if (err.status !== 401) {
						console.error("API error:", err.message);
					}
				} else {
					console.error("Unexpected error:", err);
				}
			} finally {
				setLoading(false);
			}
		};

		fetchUser().catch((error) => console.error("Error fetching user:", error));
	}, []);

	const login = (user: User) => setUser(user);
	const logout = () => setUser(null);

	const value = useMemo(() => ({ user, loading, login, logout }), [user, loading]);

	if (loading) {
		return (
			<div className="flex justify-center items-center h-64">
				<div className="animate-spin rounded-full h-10 w-10 border-4 border-zinc-600 border-t-transparent"></div>
			</div>
		);
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	return context;
};
