"use client";

import {createContext, ReactNode, useEffect, useState} from "react";
import {AuthContextType, User} from "@/features/auth/types/auth";
import {fetchCurrentUser} from "@/features/auth/api/authApi";
import {ApiError} from "@/lib/apiClient";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (user) return;

        const fetchUser = async () => {
            setLoading(true);

            try {
                const currentUser: User = await fetchCurrentUser();
                setUser(currentUser);
            } catch (err: unknown) {
                if (!(err instanceof ApiError)) {
                    console.error("Unexpected error:", err);
                }
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser().then();
    }, [user]);

    const login = (user: User) => setUser(user);
    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{user, loading, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}