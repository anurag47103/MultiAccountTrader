'use client'
import './globals.css'
import {AuthProvider} from "@/contexts/AuthContext";
import {WatchlistProvider} from "@/contexts/WatchlistContext";

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <head>
        </head>

        <body>
                    {children}
        </body>

        </html>
    );
}
