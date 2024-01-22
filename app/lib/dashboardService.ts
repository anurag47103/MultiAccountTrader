import config from "@/config/config";
import {AccountDetails, CSVDetails, StockDetails, WatchlistItem} from "@/types/types";
import axios, {AxiosResponse} from "axios";

export const getUpstoxAccounts = async() : Promise<AccountDetails[]> => {
    const getUpstoxAccountUrl = `${config.BACKEND_BASE_URL}/dashboard/getUpstoxAccounts`;
    try {
        const response  = await axios.get(getUpstoxAccountUrl, {
            withCredentials: true
        });

        const accountDetails : AccountDetails[] = response.data.accountDetails;

        return accountDetails;
    } catch (error) {
        console.log('error in getting upstox accounts ', error);
        return [];
    }
}

export const geCSVDetails = async (): Promise<CSVDetails[]> => {
    try {
        const getCSVDataUrl = `${config.BACKEND_BASE_URL}/getCSVData`;
        const response  = await axios.get(getCSVDataUrl, {
            withCredentials: true
        });
        const csvDetails : CSVDetails[] = response.data;
        return csvDetails;
    } catch (error) {
        console.error('Error fetching CSV data:', error);
        throw error;
    }
};

export const  getStockDetails = async (instrument_keys: string)  => {
    try {
        const getStockDetailsUrl : string = `${config.BACKEND_BASE_URL}/dashboard/getStockDetails?instrument_key=${instrument_keys}`;

        const response: AxiosResponse<StockDetails[]>  = await axios.get(getStockDetailsUrl, {
            withCredentials: true
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching CSV data:', error);
        throw error;
    }
}
export async function placeOrder(
    instrument_key: string,
    quantity: number = 1,
    price: number = 0,
    order_type: string = 'MARKET',
    transaction_type: string = 'BUY',
    trigger_price: number = 0,
    product: string = 'D',
    is_amo: boolean,
    disclosed_quantity: number = 0,
    validity: string = 'DAY',
    tag: string = 'string') {
    try {
        const placeOrderUrl : string = `${config.BACKEND_BASE_URL}/dashboard/placeOrder?instrument_key=${instrument_key}&
        quantity=${quantity}&
        price=${price}&
        order_type=${order_type}&
        transaction_type=${transaction_type}&
        trigger_price=${trigger_price}&
        product=${product}&
        is_amo=${is_amo}&
        disclosed_quantity=${disclosed_quantity}&
        validity=${validity}&
        tag=${tag}`
        const response = await axios.get(placeOrderUrl,
            {withCredentials:true});
    }catch(error) {
        console.log('error in placing order: ', error)
    }
}

export async function addToWatchlistForUser(instrument_key: string, userId: number) {
    try {
        const addToWatchlistUrl: string = `${config.BACKEND_BASE_URL}/dashboard/addToWatchlist`;
        console.log('userid in sending req : ', userId);
        const response = await axios.post(addToWatchlistUrl,
            {
                instrument_key: instrument_key,
                userId: userId
            },
            {withCredentials: true});

        return response.data;
    } catch(error) {
        console.error('Error in addToWatchlistForUser;')
        return undefined;
    }
}

export async function removeFromWatchlistForUser(instrument_key: string, userId: number) {
    const removeFromWatchlistUrl : string = `${config.BACKEND_BASE_URL}/dashboard/removeFromWatchlist`;

    const response = await axios.post(removeFromWatchlistUrl,
        {
            instrument_key: instrument_key,
            userId: userId
        },
        {withCredentials: true});


    return response.data;
}

export async function getWatchlistForUser( userId: number)  {

    const getWatchlistForUserUrl : string = `${config.BACKEND_BASE_URL}/dashboard/getWatchlistForUser?userId=${userId}`;

    const response = await axios.get(getWatchlistForUserUrl, {
        withCredentials: true
    })

    return response.data;
}