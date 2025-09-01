"use client";

import React from 'react';
import Image from "next/image";
import Link from "next/link";
import {useProfileImage} from "@/features/profile/hooks/useProfileImage";
import {useAuth} from "@/features/auth/hooks/useAuth";

export default function Nav() {
    const {user} = useAuth();
    const {imageUrl, loading: loadingImage} = useProfileImage(user?.handle);

    return (
        <nav className="h-screen border-r bg-mono-950 border-[var(--color-800)] backdrop-blur-sm">
            <div
                className="container-center flex flex-col items-center justify-start gap-6 px-4 py-3 text-mono-100 h-full">
                <Link href="/public" className="font-semibold">Twitter Clone</Link>

                <Link href={`/u/${user?.handle || ""}`}
                      className="flex justify-center items-center rounded-full w-9 h-9 overflow-hidden cursor-pointer hover:ring-6 ring-[var(--color-800)] transition-all duration-100">
                    <Image src={imageUrl} alt="Your Profile" width={500} height={500}
                           className="object-cover rounded-full"/>
                </Link>
            </div>
        </nav>
    );
}