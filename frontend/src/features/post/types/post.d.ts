import { Profile } from "@/features/profile/types/user";

export interface Post {
	id: number;
	author: Profile;
	content: string;
	likeCount: number;
	createdAt: Date;
}
