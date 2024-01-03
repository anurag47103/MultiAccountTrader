// types/websocket.ts
export interface StockUpdate {
    symbol: string;
    exchange: string;
    currentPrice: number;
    change: number;
    changePercentage: number;
}

// Adjusting the MarketData interface to reflect the possible undefined properties.
interface Ltpc {
    ltp?: number; // Last traded price, optional
    ltt?: string; // Last traded time, optional
    ltq?: string; // Last traded quantity, optional
    cp?: number;  // Closed price, optional
}

export interface Feed {
    [key: string]: {
        ltpc?: Ltpc; // Optional
    };
}

export interface MarketData {
    type?: string; // Optional
    feeds?: Feed; // Optional
}




export type UpdateFunction = (update: StockUpdate) => void;