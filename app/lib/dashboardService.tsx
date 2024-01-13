import config from "@/config/config";
import {AccountDetails} from "@/types/types";
import axios from "axios";

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