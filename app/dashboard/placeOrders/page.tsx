'use client'

import PlaceOrderCard from "@/ui/PlaceOrderCard";
import {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";

const PlaceOrderPage = () => {

    const [selectedStock, setSelectedStock] = useState<string>('NSE_INDEX|Nifty 50');
    const [selectedType, setSelectedType] = useState<string>('BUY');
    const searchParams = useSearchParams();
    const instrumentKey = searchParams.get('instrument_key');
    const type = searchParams.get('type');

    useEffect(() => {
        if (instrumentKey) setSelectedStock(instrumentKey);

        if(selectedType) setSelectedType(selectedType)

    }, [instrumentKey, selectedType]);

    return (
        <>
            <PlaceOrderCard instrument_key={selectedStock} buyOrSell={selectedType}/>
        </>
    );
};

export default PlaceOrderPage;
