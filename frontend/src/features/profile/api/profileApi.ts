import { User } from "@/features/auth/types/auth";
import { Profile } from "@/features/profile/types/user";
import { apiClient } from "@/lib/api/apiClient";

export type FetchProfileParams = {
	page?: number;
	limit?: number;
	searchTerm?: string;
};

export const fetchUserByHandle = async (handle: string) =>
	apiClient<Profile>(`/users/handle/${handle}`);

export const fetchFollowStatus = async (userId?: number) => {
	if (!userId) return false;
	return apiClient<boolean>(`/users/follow/status/${userId}`);
};

export const fetchProfiles = async ({
	page = 0,
	limit = 10,
	searchTerm = "",
}: FetchProfileParams) => {
	const params = new URLSearchParams({ page: String(page), limit: String(limit) });
	params.append("query", searchTerm);

	const res = await apiClient<{ items: Profile[]; hasMore: boolean }>(
		`/users/search?${params.toString()}`
	);

	return res as { items: Profile[]; hasMore: boolean };
};

export const followUser = async (userId: number) =>
	apiClient<void>(`/users/follow/${userId}`, "POST");

export const unfollowUser = async (userId: number) =>
	apiClient<void>(`/users/unfollow/${userId}`, "DELETE");

export const uploadProfileImage = async (image: File) => {
	const formData = new FormData();
	formData.append("file", image);

	return apiClient("/users/me/profile-image", "POST", formData);
};

export const updateProfile = async (body: { fullName?: string; bio?: string }) =>
	apiClient<User>("/users/me", "PATCH", body);

export const deleteAccount = async () => {
	await apiClient("/users/me", "DELETE");
};
