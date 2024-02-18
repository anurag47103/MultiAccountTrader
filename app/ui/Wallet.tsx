import React from 'react';

// Add the new properties to your WalletProps interface
interface WalletProps {
  upstoxUsername: string;
  upstoxUserId: string;
  totalCash: number;
  availableToTrade: number;
  marginUsed: number;
  totalCollateral: number;
  availableToWithdraw: number;
}

const Wallet: React.FC<WalletProps> = ({
  upstoxUsername,
  upstoxUserId,
  totalCash,
  availableToTrade,
  marginUsed,
  totalCollateral,
  availableToWithdraw,
}) => {
  const formatCurrency = (amount: number) => `₹${amount.toFixed(2)}`;

  return (
    <div className="text-white p-6 grid gap-4 grid-cols-2">
      {/* Displaying the upstox username and user ID */}

      <div className="bg-gray-800 p-4 rounded col-span-2">
        <div className="col-span-2 mb-4">
          <h3 className="text-lg font-semibold">{upstoxUsername} ({upstoxUserId})</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {/* Left column for cash details */}
          <div>
            <h3 className="text-lg mb-2 font-semibold">Total cash</h3>
            <div className="mb-4">
              <p>All segments</p>
              <p className="font-bold text-xl">{formatCurrency(totalCash)}</p>
            </div>
            <div className="mb-4">
              <p>Available to trade</p>
              <p className="font-bold">{formatCurrency(availableToTrade)}</p>
            </div>
            <div className="mb-4">
              <p>Margin used</p>
              <p className="font-bold">{formatCurrency(marginUsed)}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg mb-2 font-semibold">Total collateral</h3>
            <div className="mb-4">
              <p>Futures & Options</p>
              <p className="font-bold text-xl">{formatCurrency(totalCollateral)}</p>
            </div>
            <div className="mb-4">
              <p>Available to withdraw</p>
              <p className="font-bold">{formatCurrency(availableToWithdraw)}</p>
            </div>
          </div>
        </div>

        <p className="text-xs mt-4">Note: Only 80% of the amount after selling Demat holdings will be available to trade on the same day. The remaining 20% will be available to trade on the next day.</p>
      </div>
    </div>
  );
};

export default Wallet;
