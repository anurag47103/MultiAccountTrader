
import { Client, Holding, HoldingResponse } from '@/types/types';
import React from 'react';

const HoldingsTable = ({holdingResponse} : {holdingResponse: HoldingResponse}) => {

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-white bg-gray-800">
        <thead className='dark:bg-gray-900'>
          <tr>
            <th className='px-4 py-2 text-right text-gray-400'>Client</th>
            <th className="px-4 py-2 text-right text-gray-400">Symbol</th>
            <th className="px-4 py-2 text-right text-gray-400">Net Qty</th>
            <th className="px-4 py-2 text-right text-gray-400">Avg. Price</th>
            <th className="px-4 py-2 text-right text-gray-400">LTP</th>
            <th className="px-4 py-2 text-right text-gray-400">Current Value</th>
            <th className="px-4 py-2 text-right text-gray-400">Day P&L</th>
            <th className="px-4 py-2 text-right text-gray-400">Day %</th>
            <th className="px-4 py-2 text-right text-gray-400">Overall P&L</th>
            <th className="px-4 py-2 text-right text-gray-400">Overall %</th>
            <th className="px-4 py-2 text-right text-gray-400"></th>
          </tr>
        </thead>
        <tbody>
          {holdingResponse.clients.map((client : Client, index : number) => {
            return client.holdings.map((holding : Holding, index2: number) => {
              return (
                <tr key={index*43 + index2} className={`bg-${index % 2 === 0 ? 'gray-800' : 'gray-800'}`}>
                  <td className="py-2 text-right text-sm">{client.upstoxUsername.split(' ')[0]}<br/>{client.upstoxUserId}</td>
                  <td className="px-4 py-2 text-right">{holding.trading_symbol}</td>
                  <td className="px-4 py-2 text-right">{holding.quantity}</td>
                  <td className="px-4 py-2 text-right">{holding.average_price.toFixed(2)}</td>
                  <td className="px-4 py-2 text-right">{holding.last_price.toFixed(2)}</td>
                  <td className="px-4 py-2 text-right">{holding.current_value.toFixed(2)}</td>
                  <td className={`px-4 py-2 text-right ${holding.day_pnl < 0 ? 'text-red-500' : 'text-green-500'}`}>{holding.day_pnl.toFixed(2)}</td>
                  <td className={`px-4 py-2 text-right ${holding.day_pnl < 0 ? 'text-red-500' : 'text-green-500'}`}>{holding.day_change_percentage.toFixed(2)}%</td>
                  <td className={`px-4 py-2 text-right ${holding.pnl < 0 ? 'text-red-500' : 'text-green-500'}`}>{holding.pnl.toFixed(2)}</td>
                  <td className={`px-4 py-2 text-right ${holding.pnl < 0 ? 'text-red-500' : 'text-green-500'}`}>{holding.pnl_percentage.toFixed(2)}%</td>
                </tr>
              )
            })
          })}
        </tbody>
      </table>
    </div>
  );
};

export default HoldingsTable;
