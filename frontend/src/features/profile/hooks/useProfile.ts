import {Profile} from "@/features/profile/types/user";
import {useEffect, useState} from "react";
import {fetchUserByHandle} from "@/features/profile/api/profileApi";
import {ApiError} from "@/lib/api/httpTypes";

export const useProfile = (handle?: string) => {
    const [profile, setProfile] = useState<Profile | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!handle) {
            setProfile(undefined);
            setLoading(false);
            return;
        }

        const loadUser = async () => {
            setLoading(true);
            try {
                const fetchedUser = await fetchUserByHandle(handle);
                setProfile(fetchedUser);
            } catch (err: unknown) {
                setProfile(undefined);

                if (err instanceof ApiError) {
                    switch (err.status) {
                        case 404:
                            console.warn("User not found");
                            break;
                        case 500:
                            console.warn("Server error. Please try again later.");
                            break;
                        default:
                            console.error("Failed to fetch user:", err.message);
                    }
                } else {
                    console.error("Unexpected error while fetching user:", err);
                }
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, [handle]);

    return {profile, loading};
};