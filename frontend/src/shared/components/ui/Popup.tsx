import { X } from "lucide-react";
import { ReactNode } from "react";

interface PopupProps {
	title?: string;
	onClose?: () => void;
	className?: string;
	children: ReactNode;
}

export default function Popup({ title, onClose, className, children }: PopupProps) {
	return (
		<div className={`flex flex-col h-full ${className}`}>
			<div className="flex justify-between items-center border-b border-[var(--color-700)] py-3 pl-6 pr-4">
				<h1 className="text-lg font-semibold text-white">{title}</h1>
				<button onClick={onClose} className="p-2 text-white cursor-pointer">
					<X className="size-5" />
				</button>
			</div>

			{children}
		</div>
	);
}
