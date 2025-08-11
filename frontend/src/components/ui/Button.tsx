import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({className = '', children, ...props}: ButtonProps) {
    return (
        <button
            {...props}
            className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
        disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
        ${className}`}
        >
            {children}
        </button>
    );
}