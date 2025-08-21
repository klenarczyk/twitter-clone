import {UserSummary} from "@/features/profile/types/user";

export interface Post {
    id: number;
    author: UserSummary;
    content: string;
    createdAt: number;
}