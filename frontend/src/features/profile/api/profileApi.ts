import { Profile } from "@/features/profile/types/user";
import { apiClient } from "@/lib/api/apiClient";

export const fetchUserByHandle = async (handle: string) =>
	apiClient<Profile>(`/users/handle/${handle}`);

export const fetchFollowStatus = async (userId?: number) => {
	if (!userId) return false;
	return apiClient<boolean>(`/users/follow/status/${userId}`);
};

export const followUser = async (userId: number) =>
	apiClient<void>(`/users/follow/${userId}`, "POST");

export const unfollowUser = async (userId: number) =>
	apiClient<void>(`/users/unfollow/${userId}`, "DELETE");
