import React from 'react';

interface StockProps {
    name: string;
    price: number;
    exchange: string;
    quantity: number;
    totalPrice: number;
    onPlaceOrder: () => void;
    onQuantityChange: (quantity: number) => void;
    onOrderTypeChange: (type: 'market' | 'limit') => void;
}

const StockComponent = ({
                                                  name,
                                                  price,
                                                  exchange,
                                                  quantity,
                                                  totalPrice,
                                                  onPlaceOrder,
                                                  onQuantityChange,
                                                  onOrderTypeChange,
                                              } : StockProps) => {
    return (
        <div className="p-4 bg-white shadow-md rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">{name}</span>
                <span className="text-lg">{`${exchange} ${price.toFixed(2)}`}</span>
            </div>
            <div className="mb-4">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                    Quantity
                </label>
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    value={quantity}
                    onChange={(e) => onQuantityChange(Number(e.target.value))}
                    className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            <div className="mb-4">
                <span className="text-sm font-medium text-gray-700">Order Type</span>
                <div className="mt-1">
                    {/*<button*/}
                    {/*    type="button"*/}
                    {/*    onClick={() => onOrderTypeChange('market')}*/}
                    {/*    className={`px-4 py-2 rounded-l-md border ${*/}
                    {/*        orderType === 'market' ? 'bg-blue-500 text-white' : 'bg-white'*/}
                    {/*    }`}*/}
                    {/*>*/}
                    {/*    Market*/}
                    {/*</button>*/}
                    {/*<button*/}
                    {/*    type="button"*/}
                    {/*    onClick={() => onOrderTypeChange('limit')}*/}
                    {/*    className={`px-4 py-2 rounded-r-md border ${*/}
                    {/*        orderType === 'limit' ? 'bg-blue-500 text-white' : 'bg-white'*/}
                    {/*    }`}*/}
                    {/*>*/}
                    {/*    Limit*/}
                    {/*</button>*/}
                </div>
            </div>
            <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-gray-700">Total Price</span>
            </div>
        </div>
    );
};

export default StockComponent;