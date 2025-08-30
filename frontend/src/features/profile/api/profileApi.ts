import {apiClient} from "@/lib/apiClient";
import {Profile} from "@/features/profile/types/user";

export const fetchUserByHandle = async (handle: string) => apiClient<Profile>(
    `/users/handle/${handle}`
);