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
            <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          />
        </head>

        <body className='dark:bg-gray-800 h-screen'>
                    {children}
        </body>

        </html>
    );
}
