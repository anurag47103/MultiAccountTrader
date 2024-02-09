
import { Position, PositionClient, PositionResponse } from '@/types/types';
import React from 'react';

const PositionsTable = ({positionResponse} : {positionResponse: PositionResponse}) => {

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
            <th className="px-4 py-2 text-right text-gray-400">P&L</th>
            <th className="px-4 py-2 text-right text-gray-400">P&L %</th>
            <th className="px-4 py-2 text-right text-gray-400"></th>
          </tr>
        </thead>
        <tbody>
          {positionResponse.clients.map((client : PositionClient, index : number) => {
            return client.positions.map((position : Position, index2: number) => {
              return (
                <tr key={index*43 + index2} className={`bg-${index % 2 === 0 ? 'gray-700' : 'gray-600'}`}>
                  <td className="py-2 text-right text-sm">{client.upstoxUsername.split(' ')[0]}<br/>{client.upstoxUserId}</td>
                  <td className="px-4 py-2 text-right">{position.trading_symbol}</td>
                  <td className="px-4 py-2 text-right">{position.quantity}</td>
                  <td className="px-4 py-2 text-right">{position.buy_price.toFixed(2)}</td>
                  <td className="px-4 py-2 text-right">{position.last_price.toFixed(2)}</td>
                  <td className={`px-4 py-2 text-right ${position.pnl < 0 ? 'text-red-500' : 'text-green-500'}`}>{position.pnl.toFixed(2)}</td>
                  <td className={`px-4 py-2 text-right ${position.pnl < 0 ? 'text-red-500' : 'text-green-500'}`}>{position.quantity === 0 ? 0 : (position.pnl /( position.buy_price * position.quantity) * 100).toFixed(2)}%</td>
                </tr>
              )
            })
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PositionsTable;
