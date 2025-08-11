import React from "react";

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    error?: string;
    className?: string;
}

export default function InputField({prefix, suffix, error, className = '', ...props}: InputFieldProps) {
    const errorClasses = error
        ? 'border-red-500 shake'
        : 'border-gray-300';

    return (
        <div
            className={`inline-flex items-center w-full rounded border ${errorClasses} overflow-hidden 
            focus-within:border-blue-500 focus-within:ring focus-within:ring-blue-500 ${className}`}
        >
            {prefix && (
                <span className="bg-gray-100 text-gray-500 px-3 py-2 select-none">
                    {prefix}
                </span>
            )}
            <input
                {...props}
                onChange={(e) => {
                    props.onChange?.(e);
                }}
                className={`flex-grow px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none 
                disabled:opacity-50 disabled:cursor-not-allowed`}
            />
            {suffix && (
                <span className="flex items-center px-3 py-2 select-none">
                    {suffix}
                </span>
            )}
        </div>
    );
}