export type User = {
    id: number
    email: string
    handle: string
    imageUrl?: string
    fullName: string
    bio: string
}

export type AuthContextType = {
    user: User | null
    loading: boolean
    login: (user: User) => void
    logout: () => void
}