"use client";

import {createContext, ReactNode, useEffect, useState} from "react";
import {AuthContextType, User} from "@/features/auth/types/auth";
import {fetchCurrentUser} from "@/features/auth/api/authApi";
import {ApiError} from "@/lib/api/httpTypes";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (user) return;

        const fetchUser = async () => {
            setLoading(true);

            try {
                const currentUser = await fetchCurrentUser();
                setUser(currentUser);
            } catch (err: unknown) {
                setUser(undefined);

                if (err instanceof ApiError) {
                    switch (err.status) {
                        case 401:
                            break;
                        default:
                            console.error("API error:", err.message);
                    }
                } else {
                    console.error("Unexpected error:", err);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUser().then();
    }, [user]);

    const login = (user: User) => setUser(user);
    const logout = () => setUser(undefined);

    return (
        <AuthContext.Provider value={{user, loading, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}