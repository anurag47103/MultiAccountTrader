import StockCardWrapper from "@/ui/sideNavigation/StockCardWrapper";
import SearchBar from "@/ui/sideNavigation/SearchBar";
import Image from "next/image";

export const StockViewWrapper = () => {
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