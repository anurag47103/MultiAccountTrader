// dashboard/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { StockViewWrapper } from "@/ui/sideNavigation/StockViewWrapper";
import TopNavBar from "@/ui/topNavigation/TopNavBar";
import {AccountsProvider} from "@/contexts/AccountsContext";
import {StocksProvider} from "@/contexts/StocksContext";
import {AuthProvider} from "@/contexts/AuthContext";
import {WatchlistProvider} from "@/contexts/WatchlistContext";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Multi Account Broker',
    description: 'Stock broker application for multiple accounts.',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <AuthProvider>
            <WatchlistProvider>
                <AccountsProvider>
                    <StocksProvider>
                        <div className={`${inter.className}  h-screen`}>
                            <div className="flex-row">
                                <div className="flex">
                                        <StockViewWrapper/>
                                    <div className="flex-1 flex flex-col h-screen">
                                        <TopNavBar/>
                                        {children}
                                    </div>
                                </div>
                                <div className="flex">

                                </div>
                            </div>
                        </div>
                    </StocksProvider>
                </AccountsProvider>
            </WatchlistProvider>
        </AuthProvider>
    )
}
