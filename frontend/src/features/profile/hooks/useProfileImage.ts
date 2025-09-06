import { User } from "@/features/auth/types/auth";
import { Profile } from "@/features/profile/types/user";
import { DEFAULT_PROFILE_IMAGE, MEDIA_STORAGE_URL } from "@/lib/constants";

type UserArgs = User | Profile | null;

export function useProfileImage(user: UserArgs, loading?: boolean) {
	if (loading) return undefined;

	return user?.imageUrl?.trim() ? `${MEDIA_STORAGE_URL}/${user.imageUrl}` : DEFAULT_PROFILE_IMAGE;
}
