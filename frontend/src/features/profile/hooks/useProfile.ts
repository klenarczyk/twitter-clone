import { useEffect, useState } from "react";

import { fetchUserByHandle } from "@/features/profile/api/profileApi";
import { Profile } from "@/features/profile/types/user";
import { ApiError } from "@/lib/api/httpTypes";

export const useProfile = (handle?: string) => {
	const [profile, setProfile] = useState<Profile | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		if (!handle) {
			setProfile(null);
			setLoading(false);
			return;
		}

		const loadUser = async () => {
			setLoading(true);
			try {
				const fetchedUser = await fetchUserByHandle(handle);
				setProfile(fetchedUser);
			} catch (err: unknown) {
				setProfile(null);

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

		(async () => {
			try {
				await loadUser();
			} catch (error) {
				console.error("Error loading user:", error);
			}
		})();
	}, [handle]);

	return { profile, loading };
};
