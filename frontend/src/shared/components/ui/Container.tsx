import { ReactNode } from "react";

interface ContainerProps {
	className?: string;
	children: ReactNode;
}

export default function Container({ className, children }: ContainerProps) {
	return (
		<div
			className={`md:bg-zinc-900 rounded-2xl shadow-sm md:border md:border-zinc-800 md:mt-8 pt-2 ${className}`}
		>
			<main className="w-full max-w-2xl mx-auto">{children}</main>
		</div>
	);
}
