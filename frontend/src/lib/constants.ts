// API CONFIG
export const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
if (!API_URL) {
    throw new Error("Missing NEXT_PUBLIC_API_URL in environment variables");
}

export const MEDIA_STORAGE_URL = process.env.NEXT_PUBLIC_MEDIA_STORAGE_URL as string;
if (!MEDIA_STORAGE_URL) {
    throw new Error("Missing NEXT_PUBLIC_MEDIA_STORAGE_URL in environment variables");
}

export const DEFAULT_PROFILE_IMAGE = "/images/default-user.jpg";