import {ReactNode} from 'react';
import '@/styles/globals.css';
import {AuthProvider} from "@/features/auth/providers/AuthProvider";
import {ToastProvider} from "@/shared/toast/ToastProvider";

export default function RootLayout({children}: { children: ReactNode }) {
    return (
        <html lang="en">
        <body className="antialiased">
        <AuthProvider>
            <ToastProvider>
                {children}
            </ToastProvider>
        </AuthProvider>
        </body>
        </html>
    );
}