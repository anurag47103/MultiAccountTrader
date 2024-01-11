import { com } from "../generated/MarketDataFeed";
import {MarketData, StockUpdate} from "@/types/websocket";


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
                        symbol: key,
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



