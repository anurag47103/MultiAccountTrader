import { com } from "../generated/MarketDataFeed";
import {MarketData, StockUpdate} from "@/types/websocket";
import {WatchlistItem} from "@/types/types";
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




