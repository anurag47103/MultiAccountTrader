'use client'

import PlaceOrderCard from "@/ui/PlaceOrderCard";
import {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import UserSelection from "@/ui/UserSelection";
import { AccountsProvider, useAccounts } from "@/contexts/AccountsContext";
import { useWatchlist } from "@/contexts/WatchlistContext";
import DialogComponent from "@/ui/DialogComponent";
import NoAccountMessage from "@/ui/NoAccountMessage";

const PlaceOrderPage = () => {
    const { watchlist } = useWatchlist();
    const { loggedInAccounts } = useAccounts();

    const [selectedStock, setSelectedStock] = useState<string>(watchlist[0]);
    const [selectedType, setSelectedType] = useState<string>('BUY');
    const searchParams = useSearchParams();
    const instrumentKey = searchParams.get('instrument_key');
    const type: string = searchParams.get('type')?.toString() ?? 'BUY';

    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [orderResults, setOrderResults] = useState({ successCount: 0, failureCount: 0 });

    const handleOrderResults = (success: number, failed: number) => {
        setOrderResults({ successCount: success, failureCount: failed });
        setIsDialogOpen(true);
    };
    
    useEffect(() => {
        if (instrumentKey) setSelectedStock(instrumentKey);
        else setSelectedStock(watchlist[0]);
        
        if(selectedType) setSelectedType(selectedType)
        
    }, [instrumentKey, selectedType, watchlist]);

    if(!loggedInAccounts || loggedInAccounts.length === 0) {
        return (
           <NoAccountMessage action="place orders" />
          );
    }
    
    if(selectedStock === undefined) return <>Please select a stock from the Watchlist</>;

    
    return (
        <div className="flex-1 custom-scrollbar overflow-auto">
          <div className="">
            <PlaceOrderCard
              instrument_key={selectedStock}
              transaction={type}
              selectedUsers={selectedUsers}
              onOrderResults={handleOrderResults}
            />
            <AccountsProvider>
              <UserSelection
                selectedUsers={selectedUsers}
                setSelectedUsers={setSelectedUsers}
              />
            </AccountsProvider>
          </div>
          {isDialogOpen && (
            <DialogComponent
              onClose={() => setIsDialogOpen(false)}
              successCount={orderResults.successCount}
              failureCount={orderResults.failureCount}
            />
          )}
        </div>
      );
      
      
      
      
      
};

export default PlaceOrderPage;
