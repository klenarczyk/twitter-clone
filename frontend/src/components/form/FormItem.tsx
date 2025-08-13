import React from 'react';

type FormItemProps = {
    label: string;
    error?: string;
    children: React.ReactNode;
};

export default function FormItem({label, error, children}: FormItemProps) {
    return (
        <div className="flex flex-col">
            <label className="mb-1 font-medium text-mono-200">{label}</label>
            {children}
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
}