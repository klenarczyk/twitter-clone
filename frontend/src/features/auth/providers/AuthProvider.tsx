"use client";

import {createContext, ReactNode, useEffect, useState} from "react";
import {AuthContextType, CurrentUser} from "@/features/auth/types/auth";
import {fetchCurrentUser} from "@/lib/api";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<CurrentUser | null>(null);

    const login = (user: CurrentUser) => setUser(user);
    const logout = () => setUser(null);

    useEffect(() => {
        const fetchUser = async () => {
            const currentUser: CurrentUser | null = await fetchCurrentUser();
            setUser(currentUser);
        };

        fetchUser().then();
    }, []);

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}