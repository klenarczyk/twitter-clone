import {DEFAULT_PROFILE_IMAGE, MEDIA_STORAGE_URL} from "@/lib/constants";

export function getProfileImage(imageUrl?: string, loading?: boolean) {
    if (loading) return null;

    return imageUrl?.trim()
        ? `${MEDIA_STORAGE_URL}/${imageUrl}`
        : DEFAULT_PROFILE_IMAGE;
}