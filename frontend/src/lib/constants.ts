// API CONFIG
export const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

if (!API_URL) {
    throw new Error("Missing NEXT_PUBLIC_API_URL in environment variables");
}

export const Media = {
    DEFAULT_PROFILE_IMAGE: "/images/default-user.jpg"
}