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
}

export type AccountDetails = {
    upstoxUsername: string;
    upstoxUserId: string;
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
}