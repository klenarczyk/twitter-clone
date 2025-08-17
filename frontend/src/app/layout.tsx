'use client';

import React from 'react';
import './globals.css';
import Nav from '../components/ui/Nav';

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className="antialiased">
        <div className="min-h-screen flex">
            <Nav/>
            <div className="flex-1 container-center px-4 sm:px-6 lg:px-8 py-6">
                {children}
            </div>
        </div>
        </body>
        </html>
    );
}