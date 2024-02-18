'use client'

import { useAccounts } from "@/contexts/AccountsContext";
import { getAllHoldings } from "@/lib/dashboardService"
import { HoldingResponse } from "@/types/types";
import HoldingsTable from "@/ui/HoldingsTable";
import NoAccountMessage from "@/ui/NoAccountMessage";
import { useEffect, useState } from "react"

type HoldingsResponse = HoldingResponse | null;

const Holdings = () => {
    
  const [holdingResponse, setHoldingResponse] = useState<HoldingsResponse>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { loggedInAccounts } =  useAccounts();

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        setLoading(true);
        const data: HoldingsResponse = await getAllHoldings();
        setHoldingResponse(data);
      } catch (err) {
        setError('An error occurred while fetching holdings');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHoldings();
  }, []);

  if(!loggedInAccounts || loggedInAccounts.length === 0) {
    return (
       <NoAccountMessage action="view holdings" />
      );
  }
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!holdingResponse) return <p>No data found.</p>;

    return (
      <div className="overflow-x-auto m-4 rounded-lg flex-1 custom-scrollbar overflow-auto">
        <div className="flex justify-between text-gray-400 dark:bg-gray-800 py-3 px-6">
          <div className="flex-1">
            <div className="text-gray-400">Invested</div>
            <div className="text-white">{holdingResponse.overall_invested.toFixed(2)}</div>
          </div>
          <div className="border-l border-gray-400 pl-6 flex-1">
            <div className="text-gray-400">Current</div>
            <div className="text-white">{holdingResponse.overall_current.toFixed(2)}</div>
          </div>
          <div className="border-l border-gray-400 pl-6 flex-1">
            <div className="text-gray-400">Overall P&L</div>
            <div className={holdingResponse.overall_pnl >= 0 ? 'text-green-500' : 'text-red-500'}>
              {holdingResponse.overall_pnl.toFixed(2)} ({holdingResponse.overall_pnl_percentage.toFixed(2)}%)
            </div>
          </div>
          <div className="border-l border-gray-400 pl-6 flex-1">
            <div className="text-gray-400">Day P&L</div>
            <div className={holdingResponse.overall_day_pnl >= 0 ? 'text-green-500' : 'text-red-500'}>
              {holdingResponse.overall_day_pnl.toFixed(2)} ({holdingResponse.overall_day_pnl_percentage.toFixed(2)}%)
            </div>
          </div>
        </div>
      <div className="border border-gray-700 mb-2"></div>
      <HoldingsTable holdingResponse={holdingResponse} />
    </div>
    )
}

export default Holdings;