'use client'
import { useAccounts } from "@/contexts/AccountsContext";
import { getAllFunds } from "@/lib/dashboardService";
import { FundsResponse } from "@/types/types";
import NoAccountMessage from "@/ui/NoAccountMessage";
import Wallet from "@/ui/Wallet";
import { useEffect, useState } from "react";


const FundsPage = () => {

  const [fundsResponse, setFundsResponse] = useState<FundsResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { loggedInAccounts } = useAccounts();

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        setLoading(true);
        const data : FundsResponse[] = await getAllFunds();
        console.log('funds response', data)
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

  if(!loggedInAccounts || loggedInAccounts.length === 0) {
    return (
       <NoAccountMessage action="view funds" />
      );
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!fundsResponse || fundsResponse.length == 0 || !fundsResponse[0].funds) return <p>No data found.</p>;
  

  return (
    <div className="flex-1 custom-scrollbar overflow-auto"> 
      {
        fundsResponse.map((fundResponse, index) => {
            return <Wallet
              key={fundResponse.upstoxUserId || index}
              upstoxUsername={fundResponse.upstoxUsername}
              upstoxUserId={fundResponse.upstoxUserId}
              totalCash={fundResponse.funds.equity.available_margin + fundResponse.funds.equity.used_margin}
              availableToTrade={fundResponse.funds.equity.available_margin}
              marginUsed={fundResponse.funds.equity.used_margin}
              totalCollateral={fundResponse.funds.commodity.available_margin + fundResponse.funds.commodity.used_margin}
              availableToWithdraw={fundResponse.funds.equity.notional_cash}
          />
        }) 
      }
      
    </div>
  )
}

export default FundsPage;

