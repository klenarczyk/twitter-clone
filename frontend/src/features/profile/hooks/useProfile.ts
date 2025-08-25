import {Profile} from "@/features/profile/types/user";
import {useEffect, useState} from "react";
import {fetchUserByHandle} from "@/lib/api";

export const useProfile = (handle?: string) => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!handle) return;

        const loadUser = async () => {
            setLoading(true);
            try {
                const fetchedUser = await fetchUserByHandle(handle);
                setProfile(fetchedUser);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, [handle]);

    return {profile, loading};
};