import { Profile } from "@/features/profile/types/user";

export interface Post {
	id: number;
	author: Profile;
	content: string;
	parentPostId: number | null;
	likeCount: number;
	replyCount: number;
	isLiked: boolean;
	createdAt: Date;
}
