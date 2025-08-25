"use client";

import {createContext, ReactNode, useEffect, useState} from "react";
import {AuthContextType, User} from "@/features/auth/types/auth";
import {fetchCurrentUser} from "@/lib/api";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (user) return;

        const fetchUser = async () => {
            setLoading(true);

            try {
                const currentUser: User | null = await fetchCurrentUser();
                setUser(currentUser);
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