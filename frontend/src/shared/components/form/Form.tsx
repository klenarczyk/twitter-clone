import React from "react";

type FormProps = React.FormHTMLAttributes<HTMLFormElement> & {
	children: React.ReactNode;
	className?: string;
};

export default function Form({ children, className = "", ...props }: FormProps) {
	return (
		<form {...props} className={`md:p-6 w-full max-w-md space-y-6 ${className}`}>
			{children}
		</form>
	);
}
