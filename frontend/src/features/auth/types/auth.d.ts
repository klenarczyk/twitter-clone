export type RegisterRequest = {
    email: string;
    password: string;
    handle: string;
    fullName: string;
}

export type LoginRequest = {
    email: string;
    password: string;
}

export type User = {
    id: number;
    email: string;
    handle: string;
    imageUrl?: string;
    fullName: string;
    bio: string;
}

export type AuthContextType = {
    user: User | null;
    loading: boolean;
    login: (user: User) => void;
    logout: () => void;
}