'use client'
import './globals.css'
import { Html } from 'next/document';
import Head from 'next/head';

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html className="dark" lang="en">
        <Head>
            <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          />
        </Head>

        <body className='dark:bg-gray-800 h-screen'>
                    {children}
        </body>

        </html>
    );
}
