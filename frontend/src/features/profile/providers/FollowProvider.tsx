"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type FollowMap = Record<string, boolean>;

interface FollowContextType {
	following: FollowMap;
	toggleFollow: (userId: number) => void;
}

const FollowContext = createContext<FollowContextType>({
	following: {},
	toggleFollow: () => {},
});

export const FollowProvider = ({ children }: { children: ReactNode }) => {
	const [following, setFollowing] = useState<FollowMap>({});

	const toggleFollow = (userId: number) => {
		setFollowing((prev) => ({ ...prev, [userId]: !prev[userId] }));
	};

	return (
		<FollowContext.Provider value={{ following, toggleFollow }}>
			{children}
		</FollowContext.Provider>
	);
};

export const useFollow = () => useContext(FollowContext);
