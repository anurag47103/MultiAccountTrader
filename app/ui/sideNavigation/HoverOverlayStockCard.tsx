// HoverOverlayStockCard.tsx

import { InfoButton, SellButton, BuyButton} from "../Buttons";
interface BuyButtonProps {
    buyClickHandler: () => void; 
    sellClickHandler: () => void;// This is a function that takes no arguments and returns nothing
}
const HoverOverlayStockCard = ({buyClickHandler, sellClickHandler}: BuyButtonProps) => {
    return (
        <div className="absolute inset-0 bg-gray-800 bg-opacity-65 flex items-center justify-center space-x-2">
            <BuyButton buyClickHandler={buyClickHandler}/>
            <SellButton sellClickHandler={sellClickHandler}/>
            <InfoButton />
        </div>
    );
};

export default HoverOverlayStockCard;
