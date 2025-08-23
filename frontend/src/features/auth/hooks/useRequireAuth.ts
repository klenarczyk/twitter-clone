"use client";

import {useAuth} from "@/features/auth/hooks/useAuth";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

export const useRequireAuth = () => {
    const {user} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [user, router]);

    return user;
}