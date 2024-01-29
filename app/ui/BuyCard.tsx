import React, {FormEvent, useEffect, useState} from 'react';
import {useStocks} from "@/contexts/StocksContext";
import {placeOrder} from "@/lib/dashboardService";

interface FormDataType {
    quantity: number;
    price: number;
    orderType: string;
    triggerPrice: number;
    validity: string;
}
const BuyCard = ({instrument_key, orderType}: {instrument_key: string, orderType: string}) => {
    const { stockDetailsMap } = useStocks();
    const stock = stockDetailsMap.get(instrument_key);

    const [formData, setFormData] = useState<FormDataType>({
        quantity: 1,
        price: 0,
        orderType: 'MARKET',
        triggerPrice: 0,
        validity: 'DAY'
    });

    useEffect( () => {
        setFormData({...formData, orderType:'MARKET', price: 0, triggerPrice: 0})
    }, [ instrument_key ])


    if(!stock) return <></>
    const priceChangeColor = stock.change < 0 ? 'text-red-500' : 'text-green-500';

    const handleSubmit = async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const response = await placeOrder(
            stock.instrument_key,
            formData.quantity,
            formData.price,
            formData.orderType,
            'BUY',
            formData.triggerPrice,
            'D',
            true,
            0,
            'DAY',
            'string'
            );

        console.log(response);
    }

    const handleQuantityChange = (quantity: number) => {
        if(quantity < 1) return;
        setFormData({
                ...formData,
                quantity: quantity
            }
        )
    }

    const handlePriceChange = (price: number) => {
        if(price === 0) handleOrderTypeChange('MARKET');
        else if(formData.orderType === 'MARKET') handleOrderTypeChange('LIMIT');

        setFormData(prevState => {
            return {
                ...prevState,
                price: parseFloat(price.toFixed(2))
            }
        });
    }

    const handleTriggerPriceChange = (triggerPrice: number) => {
        setFormData({ ...formData, triggerPrice: parseFloat(triggerPrice.toFixed(2)) });
    };

    const handleOrderTypeChange = (orderType: string) => {
        if(orderType === 'MARKET') {
            setFormData({...formData, price:0, orderType:orderType})
            return;
        }
        else if(formData.orderType === 'MARKET') {
            setFormData({ ...formData, orderType: orderType, price: parseFloat(stock.currentPrice.toFixed(2))});
            return;
        }
        else setFormData({ ...formData, orderType: orderType });
    };

    const handleValidityChange = (validity: string) => {
        setFormData({ ...formData, validity: validity})
    }

    const calculateRequired = () => {
        if(formData.price === 0) return stock.currentPrice * formData.quantity;
        return formData.quantity * formData.price;
    }
    const getButtonClassName = (orderType: string) => {
        return formData.orderType === orderType
            ? "py-2 px-4 bg-blue-500 text-white rounded-lg mr-10"
            : "py-2 px-4 bg-transparent border border-gray-500 text-white rounded-lg mr-10";
    };

    return (
        <form onSubmit={handleSubmit} className="dark:bg-gray-700 shadow-lg rounded-lg p-4 m-4">
            <div className="flex justify-between items-center mb-1">
                <div className="text-xl dark:text-white font-semibold mt-1">{stock?.name}</div>
                <div className={`text-lg text-right dark:text-white font-semibold text-gray-900 mt-1`}>
                    ₹{stock?.currentPrice.toLocaleString('en-IN', {maximumFractionDigits: 2})}
                </div>
            </div>
            <div className="flex justify-between items-center mb-4">
                <span className="text-sm dark:text-gray-300">{stock?.exchange}</span>
                <span
                    className={`text-sm font-semibold ${priceChangeColor}`}>{stock?.change.toFixed(2)} ({stock?.changePercentage.toFixed(2)}%)</span>
            </div>
            <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between my-4">
                    <div>
                        <label htmlFor="quantity" className="text-m dark:text-white font-semibold">Quantity</label>
                        <div className="flex items-center mt-2">
                            <button
                                type="button"
                                onClick={ () => handleQuantityChange(formData.quantity-1) }
                                className="text-xl dark:text-white font-semibold h-8 w-8 flex items-center justify-center rounded-md border border-gray-400"
                            >
                                -
                            </button>
                            <input
                                id="quantity"
                                type="number"
                                value={formData.quantity}
                                onChange={ (e) => handleQuantityChange(parseFloat(e.target.value)) }
                                className="dark:bg-gray-800 dark:text-white mx-2 w-16 h-8 text-center border-gray-300 outline-none"
                            />
                            <button
                                type="button"
                                onClick={ () => handleQuantityChange(formData.quantity+1) }
                                className="text-xl dark:text-white font-semibold h-8 w-8 flex items-center justify-center rounded-md border border-gray-400">+
                            </button>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="price" className="text-m font-semibold ml-3">Price</label>
                        <div className="relative flex items-center mt-1">
                            <span
                                className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-sm text-gray-500">₹</span>
                            <input id="price"
                                   type="number"
                                   className="dark:bg-gray-800 dark:text-white mx-2 w-28 h-8 text-center border-gray-300 outline-none pl-8 pr-2" // Adjust the pl value if necessary
                                   placeholder="Market"
                                   value={formData.price === 0 ? '' : formData.price}
                                   onChange={(e) => {
                                       const value = e.target.value === '' ? 0 : parseFloat(e.target.value);
                                       handlePriceChange(value);
                                   }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-200 pt-4">
                <div className="flex">
                    <button
                        type="button"
                        onClick={() => handleOrderTypeChange('MARKET')}
                        className={getButtonClassName('MARKET')}
                    >
                        Market
                    </button>
                    <button
                        type="button"
                        onClick={() => handleOrderTypeChange('LIMIT')}
                        className={getButtonClassName('LIMIT')}
                    >
                        Limit
                    </button>
                    <button
                        type="button"
                        onClick={() => handleOrderTypeChange('SL LIMIT')}
                        className={getButtonClassName('SL LIMIT')}
                    >
                        SL Limit
                    </button>
                    <button
                        type="button"
                        onClick={() => handleOrderTypeChange('SL MARKET')}
                        className={getButtonClassName('SL MARKET')}
                    >
                        SL Market
                    </button>
                </div>

                {/* Conditional rendering for Trigger Price input */}
                {(formData.orderType === 'SL Limit' || formData.orderType === 'SL Mkt') && (
                    <div className="mt-4">
                        <label htmlFor="price" className="text-m font-semibold ml-3">Trigger Price</label>
                        <div className="relative flex items-center mt-1">
                            <span
                                className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-sm text-gray-500">₹</span>
                            <input id="triggerPrice"
                                   type="number"
                                   className="dark:bg-gray-800 dark:text-white mx-2 w-28 h-8 text-center border-gray-300 outline-none pl-8 pr-2"
                                   placeholder=""
                                   value={formData.triggerPrice == 0 ? '' : formData.triggerPrice}
                                   onChange={(e) => {
                                       handleTriggerPriceChange(parseFloat(e.target.value));
                                   }}
                            />
                        </div>
                    </div>
                )}
                <div className="flex flex-col">
                    <label htmlFor="validity" className="mb-1 text-sm font-semibold text-gray-700">Validity</label>
                    <select
                        id="validity"
                        name="validity"
                        value={formData.validity}
                        onChange={(e) => handleValidityChange(e.target.value)}
                        className="dark:bg-gray-800 dark:text-white text-center border border-gray-300 rounded-md"
                    >
                        <option value="Day">Day</option>
                        <option value="IOC">IOC</option>
                    </select>
                </div>
            </div>
            <div className="flex justify-between items-center border-t border-gray-200 pt-4 mt-4">
                <div className="text-m">Required: ₹{calculateRequired().toFixed(2)}</div>
                <button className="py-2 px-6 bg-green-500 text-white rounded-lg">Buy order</button>
            </div>
        </form>
    );
};

export default BuyCard;
