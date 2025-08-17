'use client';

import React, {useEffect, useState} from 'react';
import Image from "next/image";
import {UserSummary} from "@/types/User";
import {fetchCurrentUser} from "@/lib/api";
import Link from "next/link";

export default function Nav() {
    const [currentUser, setCurrentUser] = useState<UserSummary | null>(null);

    const pfpUrl = (currentUser && currentUser.profileImageUrl && currentUser.profileImageUrl.length > 0)
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${currentUser.profileImageUrl}`
        : '/images/default-user.jpg';

    useEffect(() => {
        async function loadCurrentUser() {
            try {
                const user = await fetchCurrentUser();
                setCurrentUser(user);
            } catch (error) {
                console.error('Failed to fetch current user:', error);
            }
        }

        loadCurrentUser();
    }, [])

    return (
        <nav className="h-screen border-r bg-mono-950 border-[var(--color-800)] backdrop-blur-sm">
            <div
                className="container-center flex flex-col items-center justify-start gap-6 px-4 py-3 text-mono-100 h-full">
                <Link href="/" className="font-semibold">Twitter Clone</Link>

                <Link href={`/u/${currentUser?.handle}`}
                      className="flex justify-center items-center rounded-full w-9 h-9 overflow-hidden cursor-pointer hover:ring-6 ring-[var(--color-800)] transition-all duration-100">
                    <Image src={pfpUrl} alt="Your Profile" width={500} height={500}
                           className="object-cover rounded-full"/>
                </Link>
            </div>
        </nav>
    );
}