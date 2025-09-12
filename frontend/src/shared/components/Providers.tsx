import { ReactNode } from "react";

import { AuthProvider } from "@/features/auth/context/AuthContext";
import { ComposerProvider } from "@/features/post/context/ComposerContext";
import { ToastProvider } from "@/shared/toast/ToastContext";

export function Providers({ children }: { children: ReactNode }) {
	return (
		<AuthProvider>
			<ToastProvider>
				<ComposerProvider>{children}</ComposerProvider>
			</ToastProvider>
		</AuthProvider>
	);
}
