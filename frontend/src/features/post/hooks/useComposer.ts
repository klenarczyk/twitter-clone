import { useContext } from "react";

import { ComposerContext } from "@/features/post/Providers/ComposerProviders";

export const useComposer = () => {
	const context = useContext(ComposerContext);

	if (!context) throw new Error("useComposer must be used within ComposerProvider");

	return context; // isOpen, parentPost, openComposer, closeComposer
};
