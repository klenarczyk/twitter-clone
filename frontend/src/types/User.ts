export interface User {
    id: number;
    fullName: string;
    profileImageUrl?: string;
    handle: string;
    bio?: string;
}

export interface UserSummary {
    id: number;
    fullName: string;
    profileImageUrl?: string;
    handle: string;
}