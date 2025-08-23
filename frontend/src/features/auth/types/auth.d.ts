export interface CurrentUser {
    id: number;
    fullName: string;
    imageUrl?: string;
    handle: string;
    bio?: string;
}

export type AuthContextType = {
    user: CurrentUser | null;
    login: (user: CurrentUser) => void;
    logout: () => void;
}