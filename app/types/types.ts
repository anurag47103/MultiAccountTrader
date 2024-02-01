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