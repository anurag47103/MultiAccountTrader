'use client'

import { getAllPositions } from "@/lib/dashboardService"
import {PositionResponse } from "@/types/types";
import PositionsTable from "@/ui/PositionsTable";
import { useEffect, useState } from "react"

type PositionsResponse = PositionResponse | null;

const Positions = () => {
    
  const [positionsResponse, setPositionsResponse] = useState<PositionsResponse>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        setLoading(true);
        const data: PositionsResponse = await getAllPositions();
        setPositionsResponse(data);
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
  if (!positionsResponse) return <p>No data found.</p>;

    return (
      <div className="overflow-x-auto m-4 rounded-lg">
        <div className="flex justify-between text-gray-400 dark:bg-gray-800 py-3 px-6">
          <div className="pl-6 flex-1">
            <div className="text-gray-400 ml-2">Overall P&L</div>
            <div className={positionsResponse.overall_pnl >= 0 ? 'text-green-500' : 'text-red-500'}>
              {positionsResponse.overall_pnl.toFixed(2)} ({positionsResponse.overall_pnl_percentage.toFixed(2)}%)
            </div>
          </div>
        </div>
      <div className="border border-gray-700 mb-2"></div>
      <PositionsTable positionResponse={positionsResponse} />
    </div>
    )
}

export default Positions;