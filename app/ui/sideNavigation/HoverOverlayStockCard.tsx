// HoverOverlayStockCard.tsx

import { InfoButton, SellButton, BuyButton} from "../Buttons";
interface BuyButtonProps {
    buyClickHandler: () => void; // This is a function that takes no arguments and returns nothing
}
const HoverOverlayStockCard = ({buyClickHandler}: BuyButtonProps) => {
    return (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center space-x-2">
            <BuyButton buyClickHandler={buyClickHandler}/>
            <SellButton />
            <InfoButton />
        </div>
    );
};

export default HoverOverlayStockCard;
