import { ReactNode } from "react";

import { ComposerProvider } from "@/features/post/Providers/ComposerProvider";
import Navigation from "@/shared/components/Navigation";

export default function MainLayout({ children }: { children: ReactNode }) {
	return (
		<ComposerProvider>
			<div className="min-h-screen w-auto">
				<Navigation>{children}</Navigation>
			</div>
		</ComposerProvider>
	);
}
