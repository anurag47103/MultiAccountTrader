import StockCardWrapper from "@/ui/sideNavigation/StockCardWrapper";
import SearchBar from "@/ui/sideNavigation/SearchBar";

export const StockViewWrapper = () => {
    return (
        <div className="w-80 bg-gray-800">
            <SearchBar />
            <StockCardWrapper/>
        </div>
    )
}