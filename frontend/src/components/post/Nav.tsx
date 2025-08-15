'use client';

import React from 'react';
import Image from "next/image";

export default function Nav() {
    return (
        <header className="w-full border-b bg-mono-950 border-[var(--color-800)] backdrop-blur-sm">
            <div className="container-center flex items-center justify-between px-4 py-3 text-mono-100">
                <span className="font-semibold">Twitter Clone</span>

                <nav className="hidden md:flex items-center gap-4">
                    <a className="px-3 py-2 rounded hover:bg-[var(--color-900)]" href="#">Home</a>
                    <a className="px-3 py-2 rounded hover:bg-[var(--color-900)]" href="#">Explore</a>
                    <a className="px-3 py-2 rounded hover:bg-[var(--color-900)]" href="#">Notifications</a>
                    <a className="px-3 py-2 rounded hover:bg-[var(--color-900)]" href="#">Messages</a>
                </nav>

                <button className="w-9 h-9 rounded-full overflow-hidden cursor-pointer" aria-label="Profile">
                    <Image src="/images/default-user.jpg" alt="Your Profile" width={50} height={50}/>
                </button>
            </div>
        </header>
    );
}