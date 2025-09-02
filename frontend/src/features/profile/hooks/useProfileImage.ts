import {useProfile} from "./useProfile";
import {DEFAULT_PROFILE_IMAGE, MEDIA_STORAGE_URL} from "@/lib/constants";

export function useProfileImage(handle?: string) {
    const {profile, loading} = useProfile(handle);

    const imageUrl = profile?.imageUrl?.trim()
        ? `${MEDIA_STORAGE_URL}/${profile.imageUrl}`
        : DEFAULT_PROFILE_IMAGE;

    return {imageUrl, loading};
}
