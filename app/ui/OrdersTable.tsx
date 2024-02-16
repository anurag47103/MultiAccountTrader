// components/OrdersTable.tsx
import { Orders } from '@/types/types';
import React from 'react';

interface OrdersTableProps {
  orders: Orders[]
}

const OrdersTable: React.FC<OrdersTableProps> = ({ orders }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-gray-800 text-white">
        <thead className='dark:bg-gray-900'>
          <tr className="text-left">
            <th className="text-sm px-3 py-2 text-right text-gray-400">Client</th>
            <th className="text-sm px-3 py-2 text-right text-gray-400">Symbol</th>
            <th className="text-sm px-3 py-2 text-right text-gray-400">Status</th>
            <th className="text-sm px-3 py-2 text-right text-gray-400">Product</th>
            <th className="text-sm px-3 py-2 text-right text-gray-400">Time</th>
            <th className="text-sm px-3 py-2 text-right text-gray-400">Side</th>
            <th className="text-sm px-3 py-2 text-right text-gray-400">Quantity</th>
            <th className="text-sm px-3 py-2 text-right text-gray-400">Price</th>
            <th className="text-sm px-3 py-2 text-right text-gray-400">Trigger Price</th>
            <th className="text-sm px-3 py-2 text-right text-gray-400">Avg. Price</th>
            <th className="text-sm px-3 py-2 text-right text-gray-400">AMO</th>
          </tr>
        </thead>
        <tbody>
          {
            orders.map((order : Orders, orderIndex) => (
              <tr key={order.order_id} className="border-t border-gray-700">
                <td className='px-4 py-2 text-right text-sm'>{order.upstoxUsername.toString().split(' ')[0]}<br/>{order.upstoxUserId}</td>
                <td className="px-4 py-2 text-right">{order.trading_symbol.split('-')[0]}</td>
                <td className="px-4 py-2 text-right">{order.status}</td>
                <td className="px-4 py-2 text-right">{order.product}</td>
                <td className="px-4 py-2 text-right">{order.order_timestamp}</td>
                <td className="px-4 py-2 text-center">{order.transaction_type}</td>
                <td className="px-4 py-2 text-center">{order.filled_quantity}/{order.quantity}</td>
                <td className="px-4 py-2 text-right">{order.price}</td>
                <td className="px-4 py-2 text-right">{order.trigger_price}</td>
                <td className="px-4 py-2 text-right">{order.average_price || order.price}</td>
                <td className="px-4 py-2 text-right">{order.is_amo ? 'Yes' : 'No'}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
