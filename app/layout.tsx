'use client'
import './globals.css'
import {AuthProvider} from "@/contexts/AuthContext";

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
            <AuthProvider>
                {children}
            </AuthProvider>
        </body>

        </html>
    );
}
