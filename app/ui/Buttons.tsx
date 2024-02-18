interface InfoButtonProps {
    onInfoClick: () => void; // Add an onClick prop to the interface
}

export function InfoButton({onInfoClick}: InfoButtonProps) {
    return (
        <button onClick={onInfoClick} className="text-grey rounded px-2 py-1 text-lg flex items-center justify-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-4 h-4"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={4}
                    d="M12 4v.01M12 12v.01M12 20v.01"
                />
            </svg>
        </button>
    );
}

interface BuyButtonProps {
    buyClickHandler: () => void;
}

export function BuyButton({ buyClickHandler }: BuyButtonProps) {

    return (
        <button className="px-3 py-1 bg-green-500 text-white rounded-lg text-xs flex items-center justify-center" onClick={buyClickHandler}>
            Buy
        </button>
    )
}

export function SellButton( {sellClickHandler}: {sellClickHandler : () => void}) {
    return (
        <button onClick={sellClickHandler} className="px-3 py-1 bg-red-500 text-white rounded-lg text-xs flex items-center justify-center">
            Sell
        </button>
    )
}
