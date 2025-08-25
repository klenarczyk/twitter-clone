import {useProfile} from "./useProfile";
import {Media} from "@/lib/constants";

export function useProfileImage(handle?: string) {
    const {profile, loading} = useProfile(handle);

    const imageUrl = profile?.imageUrl?.trim()
        ? `${process.env.NEXT_PUBLIC_MEDIA_URL ?? ""}/${profile.imageUrl}`
        : Media.DEFAULT_PROFILE_IMAGE;

    return {imageUrl, loading};
}
