import React, {forwardRef} from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({className, error, ...props}, ref) => {
        return (
            <div className="w-full">
        <textarea
            ref={ref}
            className={
                `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
                focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed resize-none
                ${error && "border-red-500 focus:ring-red-500 focus:border-red-500"} ${className}`}
            {...props}
        />
                {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            </div>
        );
    }
);

Textarea.displayName = "Textarea";