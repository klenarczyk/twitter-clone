import {UserSummary} from "@/types/User";

export interface Post {
    id: number;
    author: UserSummary;
    content: string;
    createdAt: number;
}