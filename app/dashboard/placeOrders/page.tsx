'use client'

import BuyCard from "@/ui/BuyCard";
import {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import {StocksProvider} from "@/contexts/StocksContext";

const PlaceOrderPage = () => {

    const [selectedStock, setSelectedStock] = useState<string>('NSE_INDEX|Nifty 50');
    const [selectedType, setSelectedType] = useState<string>('BUY');
    const searchParams = useSearchParams();
    const instrumentKey = searchParams.get('instrument_key');
    const type = searchParams.get('type');

    useEffect(() => {
        if (instrumentKey) {
            setSelectedStock(instrumentKey);
        }
        if(selectedType) setSelectedType(selectedType)

    }, [instrumentKey, selectedType]);

    return (
        <>
            <StocksProvider>
                <BuyCard instrument_key={selectedStock} orderType={selectedType}/>
            </StocksProvider>

        </>
    );
};

export default PlaceOrderPage;
