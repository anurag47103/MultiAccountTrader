'use client'
import { getAllFunds } from "@/lib/dashboardService";
import { FundsResponse } from "@/types/types";
import Wallet from "@/ui/Wallet";
import { useEffect, useState } from "react";


const FundsPage = () => {

  const [fundsResponse, setFundsResponse] = useState<FundsResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        setLoading(true);
        const data : FundsResponse[] = await getAllFunds();

        console.log(data);

        setFundsResponse(data);
      } catch (err) {
        setError('An error occurred while fetching Positions');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!fundsResponse) return <p>No data found.</p>;
  

  return (
    <div className="flex-1 h-screen custom-scrollbar overflow-auto"> 
      {
        fundsResponse.map(fundResponse => {
            return <Wallet
              upstoxUsername={fundResponse.upstoxUsername}
              upstoxUserId={fundResponse.upstoxUserId}
              totalCash={fundResponse.funds.equity.available_margin + fundResponse.funds.equity.used_margin}
              availableToTrade={fundResponse.funds.equity.available_margin}
              marginUsed={fundResponse.funds.equity.used_margin}
              unavailableToTrade={1234}
              totalCollateral={fundResponse.funds.commodity.available_margin + fundResponse.funds.commodity.used_margin}
              availableToWithdraw={fundResponse.funds.equity.notional_cash}
          />
        }) 
      }
      
    </div>
  )
}

export default FundsPage;

