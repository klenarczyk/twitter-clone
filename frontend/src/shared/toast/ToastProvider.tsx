"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckIcon, X } from "lucide-react";
import React, { createContext, ReactNode, useState } from "react";

import ExclamationIcon from "@/shared/components/icons/ExclamationIcon";
import InfoIcon from "@/shared/components/icons/InfoIcon";
import { Toast } from "@/shared/toast/toast";

type ToastContextType = {
	toasts: Toast[];
	addToast: (toast: Omit<Toast, "id">) => void;
	removeToast: (id: string) => void;
};

const ToastIcon = ({ type, className }: { type?: string; className?: string }) => {
	const iconClass = "text-black size-2/3";
	const cn: string = `flex items-center justify-center size-5 rounded-full ${className}`;

	switch (type) {
		case "success":
			return (
				<div
					className={`${cn} bg-green-500`}
					style={{ boxShadow: "0 0 20px 1px rgba(72, 187, 120, 0.75)" }}
				>
					<CheckIcon className={iconClass} />
				</div>
			);
		case "error":
			return (
				<div
					className={`${cn} bg-red-500`}
					style={{ boxShadow: "0 0 20px 1px rgba(255, 72, 72, 0.75)" }}
				>
					<ExclamationIcon className={`${iconClass} text-white`} />
				</div>
			);
		case "info":
			return (
				<div
					className={`${cn} bg-gray-200`}
					style={{ boxShadow: "0 0 20px 1px rgba(200, 200, 200, 0.75)" }}
				>
					<InfoIcon className={iconClass} />
				</div>
			);
		default:
			return null;
	}
};

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
	const [toasts, setToasts] = useState<Toast[]>([]);

	const addToast = (toast: Omit<Toast, "id">) => {
		const id = crypto.randomUUID();
		setToasts((prev) => [...prev, { id, ...toast }]);
		setTimeout(() => removeToast(id), 3000);
	};

	const removeToast = (id: string) => {
		setToasts((prev) => prev.filter((t) => t.id !== id));
	};

	return (
		<ToastContext.Provider value={{ toasts, addToast, removeToast }}>
			{children}

			<div className="fixed top-0 right-0 z-[100] flex max-h-screen gap-2 w-full flex-col-reverse p-4 md:max-w-[420px]">
				<AnimatePresence>
					{toasts.map((t) => (
						<motion.div
							key={t.id}
							initial={{ opacity: 0, x: 100, y: 0 }}
							animate={{ opacity: 1, x: 0, y: 0 }}
							exit={{ opacity: 0, x: 100, y: 0, transition: { duration: 0.1 } }}
							transition={{
								x: { type: "spring", stiffness: 400, damping: 25 },
								y: { type: "spring", stiffness: 400, damping: 25 },
								opacity: { duration: 0.15 },
								layout: { type: "spring", stiffness: 300, damping: 25 },
							}}
							layout
							className={
								"pointer-events-auto relative flex w-full items-center justify-start" +
								" overflow-hidden rounded-lg border px-4 py-6 shadow-lg bg-[#111111] text-foreground"
							}
						>
							<ToastIcon type={t.type} />

							<p className="flex-1 px-4 wrap text-sm text-white">{t.text}</p>

							<X
								className="text-gray-300 size-5 cursor-pointer"
								onClick={() => removeToast(t.id)}
							/>

							<motion.div
								className="absolute bottom-0 left-0 h-0.5 bg-white/50"
								initial={{ width: "100%" }}
								animate={{ width: 0 }}
								transition={{ duration: 3, ease: "linear" }}
							/>
						</motion.div>
					))}
				</AnimatePresence>
			</div>
		</ToastContext.Provider>
	);
}
