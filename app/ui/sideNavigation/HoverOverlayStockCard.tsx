// HoverOverlayStockCard.tsx

import { useState } from "react";
import { InfoButton, SellButton, BuyButton} from "../Buttons";
interface BuyButtonProps {
    buyClickHandler: () => void; 
    sellClickHandler: () => void;
    removeHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;// This is a function that takes no arguments and returns nothing
}
const HoverOverlayStockCard = ({buyClickHandler, sellClickHandler, removeHandler}: BuyButtonProps) => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible);

    const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
        removeHandler(e);
    }
    return (
        <>
        
        <div className="absolute inset-0 bg-gray-800 bg-opacity-65 flex items-center justify-center space-x-2">
            <BuyButton buyClickHandler={buyClickHandler}/>
            <SellButton sellClickHandler={sellClickHandler}/>
            <InfoButton onInfoClick={toggleDropdown}/>
        </div>

        {isDropdownVisible && (
  <div className="absolute top-full right-0 translate-x-[-20px] translate-y-[-20px] bg-dark shadow-md rounded py-2 w-20 h-12">
    <button
      onClick={handleRemove}
      className="block w-full text-center text-sm text-white bg-gray-800 hover:bg-gray-900 h-10"
    >
      Remove
    </button>
  </div>
)}


      </>
    );
};

export default HoverOverlayStockCard;
