'use client';

import React from 'react';
import Image from "next/image";

export default function Suggested() {
    const suggestions = [
        {name: 'Design Weekly', handle: '@designweekly'},
        {name: 'Frontend News', handle: '@frontend'},
        {name: 'Open Source', handle: '@opensource'}
    ];

    return (
        <aside className="sticky top-6">
            <div className="bg-mono-900 border rounded-lg p-4 shadow-sm space-y-4">
                <div>
                    <h3 className="font-semibold text-mono-100">Who to follow</h3>
                    <p className="text-sm text-mono-500">Suggestions for you</p>
                </div>

                <ul className="space-y-3">
                    {suggestions.map((s, key) => (
                        <li key={key} className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3 cursor-pointer">
                                <Image src={"/images/default-user.jpg"} alt={"Suggested User"} height={40} width={40}
                                       className={"rounded-full"}/>
                                <div>
                                    <div className="font-semibold text-mono-100">{s.name}</div>
                                    <div className="text-sm text-mono-500">{s.handle}</div>
                                </div>
                            </div>
                            <button
                                className="px-3 py-1 rounded-full font-semibold text-sm bg-blue-400 text-white cursor-pointer">
                                Follow
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="pt-2 text-sm text-mono-300 cursor-pointer">See more</div>
            </div>
        </aside>
    );
}