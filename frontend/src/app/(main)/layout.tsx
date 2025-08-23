import {ReactNode} from "react";
import Nav from "@/features/ui/Nav";

export default function RootLayout({children}: { children: ReactNode }) {
    return (
        <div className="min-h-screen flex">
            <Nav/>
            <div className="flex-1 container-center px-4 sm:px-6 lg:px-8 py-6">
                {children}
            </div>
        </div>
    );
}