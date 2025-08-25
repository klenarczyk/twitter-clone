import {ProfileSummary} from "@/features/profile/types/user";

export interface Post {
    id: number;
    author: ProfileSummary;
    content: string;
    createdAt: number;
}