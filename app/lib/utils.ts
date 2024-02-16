import { com } from "../generated/MarketDataFeed";
import {MarketData, StockUpdate} from "@/types/websocket";
import { OrderResponse, Orders, WatchlistItem} from "@/types/types";
import Cookies from 'js-cookie'


const FeedResponse = com.upstox.marketdatafeeder.rpc.proto.FeedResponse;

function formatData(jsonUpdates: MarketData): StockUpdate[] {
    const updates: StockUpdate[] = [];

    if (jsonUpdates.feeds && typeof jsonUpdates.feeds === 'object') {
        for (const key in jsonUpdates.feeds) {
            const marketItem = jsonUpdates.feeds[key];
            if (marketItem?.ltpc) {
                const data = marketItem.ltpc;
                if (typeof data.ltp === 'number' && typeof data.cp === 'number') {
                    const change = data.ltp - data.cp;
                    const changePercentage = (change / data.cp) * 100;

                    const update: StockUpdate = {
                        instrument_key: key,
                        exchange: key.split('|')[0],
                        currentPrice: data.ltp,
                        change: change,
                        changePercentage: changePercentage,
                    };

                    updates.push(update);
                }
            }
        }
    }

    return updates;
}

function transformToMarketData(obj: any): MarketData {
    return {
        type: obj.type,
        feeds: obj.feeds
    };
}

export const decodeMessage = (message: ArrayBuffer): StockUpdate[] => {
    const binaryData = new Uint8Array(message);
    const feedUpdate = FeedResponse.deserializeBinary(binaryData);
    const jsonUpdate: MarketData = transformToMarketData(feedUpdate.toObject());
    const formatedUpdate = formatData(jsonUpdate);

    return formatedUpdate;
};

export const generateInstrumentKeysString = (watchlist : string[] ) : string => {
    let instrumentKeys : string = '';
    watchlist.forEach((item, position) => {
        instrumentKeys += item;
        if(position != watchlist.length-1) instrumentKeys += ',';
    })
    return instrumentKeys;
}

export function setLocalStorageWithExpiry(key: string, value: string, expiryHour: number) {
    const now = new Date();

    // `item` is an object which contains the original value and the time of expiry
    const item = {
        value: value,
        expiry: now.getTime() + expiryHour * 3600000, // converting hours to milliseconds
    };

    localStorage.setItem(key, JSON.stringify(item));
}

export function getLocalStorageWithExpiry(key: string) {
    const itemStr = localStorage.getItem(key);

    if (!itemStr) {
        return null;
    }

    const item = JSON.parse(itemStr);
    const now = new Date();

    if (now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
    }

    return item.value;
}

export const formatOrderResponse = (orders: Orders[]): Orders[] => {
    orders.forEach((order: Orders) => {
            let status: string = order.status;
            if (status === 'after market order req received') {
                status = 'AMO';
            }
            status = status.toUpperCase();

            const convertedTime: string = convertTo12HrFormat(order.order_timestamp);
            order.status = status;
            order.order_timestamp = convertedTime;
        });

    return orders;
};

export const sortOrderResponse = (orders: Orders[]): Orders[] => {
    orders.sort((a, b) => new Date(b.order_timestamp).getTime() - new Date(a.order_timestamp).getTime());
    return orders;
};


function convertTo12HrFormat(dateString: string) {
    // Create a new Date object using the date string
    const date = new Date(dateString);
  
    // Convert to local time string and specify options to use a 12-hour clock
    const timeString = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  
    return timeString;
}

function encrypt(object: string) {

}

function decrypt(object: string) {

}


