import config from "@/config/config";
import {AccountDetails, CSVDetails, StockDetails, WatchlistItem} from "@/types/types";
import axios, {AxiosResponse} from "axios";
import getAxiosInstance from "./axiosInstance";

const axiosInstance = getAxiosInstance();

export const getCSVDetails = async (): Promise<CSVDetails[]> => {
    try {
        const getCSVDataUrl = `/getCSVData`;
        const response  = await axiosInstance.get(getCSVDataUrl);
        const csvDetails : CSVDetails[] = response.data;
        return csvDetails;
    } catch (error) {
        console.error('Error fetching CSV data:', error);
        throw error;
    }
};

export const getStockDetails = async (instrument_keys: string)  => {
    try {
        const getStockDetailsUrl : string = `/dashboard/getStockDetails?instrument_key=${instrument_keys}`;

        const response: AxiosResponse<StockDetails[]>  = await axiosInstance.get(getStockDetailsUrl);

        return response.data;
    } catch (error) {
        console.error('Error fetching Stock Details: ', error);
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
    tag: string = 'string',
    selectedUsers: string[]) {
    const placeOrderUrl: string = `/dashboard/placeOrder`;

    const orderData = {
        instrument_key: instrument_key,
        quantity: quantity,
        price: price,
        order_type: order_type,
        transaction_type: transaction_type,
        trigger_price: trigger_price,
        product: product,
        is_amo: is_amo,
        disclosed_quantity: disclosed_quantity,
        validity: validity,
        tag: tag,
        selectedUsers: selectedUsers
    };

    try {
        const response = await axiosInstance.post(placeOrderUrl, orderData);
        return response.data;
    }catch(error) {
        console.log('error in placing order: ', error)
    }
}

export async function addToWatchlistForUser(instrument_key: string, userId: number) {
    try {
        const addToWatchlistUrl: string = `/dashboard/addToWatchlist`;
        console.log('userid in sending req : ', userId);
        const response = await axiosInstance.post(addToWatchlistUrl,
            {
                instrument_key: instrument_key,
                userId: userId
            });

        return response.data;
    } catch(error) {
        console.error('Error in addToWatchlistForUser;')
        return undefined;
    }
}

export async function removeFromWatchlistForUser(instrument_key: string, userId: number) {
    const removeFromWatchlistUrl : string = `/dashboard/removeFromWatchlist`;

    const response = await axiosInstance.post(removeFromWatchlistUrl,
        {
            instrument_key: instrument_key,
            userId: userId
        });


    return response.data;
}

export async function getWatchlistForUser( userId: number)  {

    const getWatchlistForUserUrl : string = `/dashboard/getWatchlistForUser?userId=${userId}`;

    const response = await axiosInstance.get(getWatchlistForUserUrl)

    return response.data;
}

export async function addUpstoxUser( user_id: number, name: string, upstoxId: string, apiKey: string, apiSecret: string) {
    const addUpstoxUserUrl : string = `/dashboard/addUpstoxUser`;

    const response = await axiosInstance.post(addUpstoxUserUrl, {
        user_id: user_id,
        name,
        upstoxId,
        apiKey,
        apiSecret
    });

    return response.data;
}

export const getUpstoxAccounts = async() : Promise<AccountDetails[]> => {
    const getUpstoxAccountUrl = `/dashboard/getUpstoxAccounts`;
    try {
        const response  = await axiosInstance.get(getUpstoxAccountUrl);

        const accountDetails : AccountDetails[] = response.data.accountDetails;

        return accountDetails;
    } catch (error) {
        console.log('error in getting upstox accounts ', error);
        return [];
    }
}

export const getAllHoldings = async() => {
    const getAllHoldingsUrl = `/dashboard/getAllHoldings`;

    try {
        const response = await axiosInstance.get(getAllHoldingsUrl);

        console.log('response from getAllHoldings', response);
        return response.data;
    } catch(error) {
        console.error('Error in getting all Holdings', error);
    }
}

export const getAllOrders  = async() => {
    const getAllOrdersUrl = `/dashboard/getAllOrders`;

    try {
        const response = await axiosInstance.get(getAllOrdersUrl);

        console.log('response from getAllOrders: ', response.data);
        return response.data;
    } catch(error) {
        console.error('Error in getting all Orders : ', error);
    }
}

export const getAllPositions = async() => {
    const getAllPositionsUrl = `/dashboard/getAllPositions`;

    try {
        const response = await axiosInstance.get(getAllPositionsUrl);

        console.log('response from getAllPositions', response);
        return response.data;
    } catch(error) {
        console.error('Error in getting all Positions', error);
    }
}

