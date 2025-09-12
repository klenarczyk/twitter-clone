export type Profile = {
	id: number;
	handle: string;
	imageUrl: string;
	fullName: string;
	followerCount: number;
	followingCount: number;
	postCount: number;
	isFollowed: boolean;
	bio: string;
};
