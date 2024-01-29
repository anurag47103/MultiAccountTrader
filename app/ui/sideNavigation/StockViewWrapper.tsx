import StockCardWrapper from "@/ui/sideNavigation/StockCardWrapper";
import SearchBar from "@/ui/sideNavigation/SearchBar";
import Image from "next/image";

export const StockViewWrapper = () => {
    return (
        <div className="flex flex-col h-screen w-80">
            <Image
                src={'/logoDark8.png'}
                alt={'logo'}
                width={250}
                height={50}
                className="my-2 ml-8"
            />
            <SearchBar />
            <StockCardWrapper/>
        </div>
    )
}