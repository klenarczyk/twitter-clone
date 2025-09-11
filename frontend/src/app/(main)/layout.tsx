import type { ReactNode } from "react";

import Navigation from "@/shared/components/Navigation";

export default function MainLayout({ children }: { children: ReactNode }) {
	return (
		<div className="min-h-screen w-auto">
			<Navigation>{children}</Navigation>
		</div>
	);
}
