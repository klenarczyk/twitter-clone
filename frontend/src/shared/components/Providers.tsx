"use client";

import { ReactNode } from "react";

import { AuthProvider } from "@/features/auth/providers/AuthProvider";
import { ComposerProvider } from "@/features/post/Providers/ComposerProvider";
import { FollowProvider } from "@/features/profile/providers/FollowProvider";
import { ToastProvider } from "@/shared/toast/ToastProvider";

export function Providers({ children }: { children: ReactNode }) {
	return (
		<AuthProvider>
			<ToastProvider>
				<FollowProvider>
					<ComposerProvider>{children}</ComposerProvider>
				</FollowProvider>
			</ToastProvider>
		</AuthProvider>
	);
}
