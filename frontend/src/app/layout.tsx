import {ReactNode} from 'react';
import '@/styles/globals.css';
import {AuthProvider} from "@/features/auth/providers/AuthProvider";

export default function RootLayout({children}: { children: ReactNode }) {
    return (
        <html lang="en">
        <body className="antialiased">
        <AuthProvider>
            {children}
        </AuthProvider>
        </body>
        </html>
    );
}