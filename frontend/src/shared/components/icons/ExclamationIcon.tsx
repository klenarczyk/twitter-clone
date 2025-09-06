import React from "react";

const ErrorIcon = ({ className }: { className?: string }) => (
	<div className={`flex items-center justify-center ${className}`}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 -960 960 960"
			fill="currentColor"
		>
			<path d="M440-400v-360h80v360h-80Zm0 200v-80h80v80h-80Z" />
		</svg>
	</div>
);

export default ErrorIcon;
