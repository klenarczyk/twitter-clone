import React, {forwardRef} from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({className, ...props}, ref) => {
        return (
            <div className="w-full">
        <textarea
            ref={ref}
            className={
                `w-full py-2 border rounded-md border-none focus:outline-none disabled:opacity-50 
                disabled:cursor-not-allowed resize-none font-normal text-base text-mono-50 ${className}`}
            {...props}
        />
            </div>
        );
    }
);

Textarea.displayName = "Textarea";