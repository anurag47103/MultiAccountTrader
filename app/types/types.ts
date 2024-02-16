export type UserRegistrationDetails = {
    name: string;
    email: string;
    password: string;
};

export type UserLoginDetails = {
    email: string;
    password: string;
};

export type UserData = {
    user_id: number,
    username: string,
    token: string
}

export type AccountDetails = {
    upstoxUsername: string;
    upstoxUserId: string;
    isLoggedIn: boolean;
};

export type CSVDetails = {
    instrument_key: string,
    name: string,
    last_price: number,
    exchange: number
}

export interface WatchlistItem {
    instrument_key: string;
}

export interface StockDetails {
    name: string;
    exchange: string;
    price: number;
    change: number;
    instrument_key: string;
    lower_circuit_limit: number;
    upper_circuit_limit: number;
}

export type Holding = {
    isin: string;
    company_name: string;
    product: string;
    quantity: number;
    last_price: number;
    close_price: number;
    pnl: number;
    day_change: number;
    day_change_percentage: number;
    instrument_token: string;
    average_price: number;
    trading_symbol: string;
    exchange: string;
    day_pnl: number;
    pnl_percentage: number;
    current_value: number;
  };

export type HoldingResponse = {
    clients: Client[],
    overall_pnl : number,
    overall_day_pnl : number,
    overall_invested : number,
    overall_current : number,
    overall_pnl_percentage: number, 
    overall_day_pnl_percentage: number,
}

export type Client = {
    upstoxUserId: string,
    upstoxUsername: string,
    holdings: Holding[],
    pnl: Pnl,
}

export interface Pnl {
    overall_pnl : number,
    overall_pnl_percentage : number,
    day_pnl : number,
    day_pnl_percentage : number,
    invested: number,
    current: number
}

export type Orders = {
    upstoxUserId: string,
    upstoxUsername: string,
    exchange: string,
    product: string,
    price: number,
    quantity: number,
    status: string,
    instrument_token: string,
    placed_by: string,
    trading_symbol: string,
    order_type: string, 
    validity: string,
    trigger_price: number,
    transaction_type: string,
    average_price: number,
    filled_quantity: number,
    pending_quantity: number,
    order_id: string,
    order_timestamp: string,
    is_amo: boolean
    order_ref_id: string
}

export type OrderResponse = {
    orders: Orders[]
}

export type Position = {
    exchange: string;
    multiplier: number;
    value: number;
    pnl: number;
    product: string;
    instrument_token: string;
    average_price: number;
    quantity: number;
    last_price: number;
    close_price: number;
    buy_price: number;
    sell_price: number
    trading_symbol: string;
};

export type PositionResponse = {
    clients: PositionClient[],
    overall_pnl : number,
    overall_pnl_percentage: number, 
}

export type PositionClient = {
    upstoxUserId: string,
    upstoxUsername: string,
    positions: Position[],
    pnl: PositionPnl,
}

export type PositionPnl = {
    pnl: number,
    pnl_percentage: number
}