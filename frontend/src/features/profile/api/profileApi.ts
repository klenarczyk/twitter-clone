import { Profile } from "@/features/profile/types/user";
import { apiClient } from "@/lib/api/apiClient";

export const fetchUserByHandle = async (handle: string) =>
	apiClient<Profile>(`/users/handle/${handle}`);
