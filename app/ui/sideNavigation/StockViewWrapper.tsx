'use client'
import StockCardWrapper from "@/ui/sideNavigation/StockCardWrapper";
import SearchBar from "@/ui/sideNavigation/SearchBar";
import Image from "next/image";
import { useEffect } from "react";
import { checkCSVData, storeCSVData } from "@/db";
import { CSVDetails } from "@/types/types";
import { getCSVDetails } from "@/lib/dashboardService";

export const StockViewWrapper = () => {

    useEffect(() => {
        (async () => {
            if(await checkCSVData()) return;
            const csvData: CSVDetails[] = await getCSVDetails();
            storeCSVData(csvData);
        })()
    },[])

    return (
        <div className="flex flex-col h-screen w-80 min-w-80">
            <Image
                src={'/logoDark10.svg'}
                alt={'logo'}
                width={160}
                height={480}
                className="mb-3 ml-20"
            />
            <SearchBar />
            <StockCardWrapper/>
        </div>
    )
}