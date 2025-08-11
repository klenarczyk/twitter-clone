import React from "react";

type FormProps = React.FormHTMLAttributes<HTMLFormElement> & {
    children: React.ReactNode;
    className?: string;
};

export default function Form({children, className = '', ...props}: FormProps) {
    return (
        <form
            {...props}
            className={`background-default p-6 rounded-lg shadow-md w-full max-w-md space-y-6 ${className}`}
        >
            {children}
        </form>
    );
}