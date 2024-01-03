// HoverOverlay.tsx

import { InfoButton, SellButton, BuyButton} from "../Buttons";

const HoverOverlay = () => {
    return (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center space-x-2">
            <BuyButton />
            <SellButton />
            <InfoButton />
        </div>
    );
};

export default HoverOverlay;
