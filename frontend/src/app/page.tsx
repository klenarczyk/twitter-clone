'use client';

import React from 'react';
import Feed from '../components/post/Feed';
import Suggested from '../components/post/Suggested';
import Composer from '../components/post/Composer';

export default function HomePage() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <main className="lg:col-span-2 flex flex-col gap-6">
                <Composer/>
                <Feed initialPageSize={8}/>
            </main>

            <aside className="hidden lg:block">
                <Suggested/>
            </aside>
        </div>
    );
}