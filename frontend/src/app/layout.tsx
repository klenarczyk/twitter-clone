import "@/styles/globals.css";

import { ReactNode } from "react";
import { Providers } from "@/shared/components/Providers";

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body className="antialiased">
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
