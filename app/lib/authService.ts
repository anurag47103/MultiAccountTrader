import axios, {AxiosResponse} from 'axios'
import config from "@/config/config";
import {UserLoginDetails, UserRegistrationDetails, UserData} from "@/types/types"
export const getAuthUrl = async (upstoxUserId: string): Promise<string> => {

    try {
        const getAuthUrl = `${config.REACT_APP_GET_AUTH_URL}?upstoxUserId=${upstoxUserId}`;
        console.log(getAuthUrl)
        const response = await axios.get(getAuthUrl, {
            withCredentials: true
        });

        return response?.data?.authUrl;

    } catch (error) {
        console.error("There was an error fetching the auth URL:", error);
        if (axios.isAxiosError(error)) {
            console.error("Axios error response:", error.response);
        } else {
            console.error("An unexpected error occurred:", error);
        }
        throw error;
    }
};

export const registerUser = async ({ name, email, password }: UserRegistrationDetails): Promise<boolean> => {
    const registerUrl = 'http://localhost:4001/api/v1/auth/register';

    try {
        const response = await axios.post(registerUrl, {
            name,
            email,
            password
        });

        console.log('Registration successful:', response.data);
        return true;
    } catch (error: any) {
        console.error('Registration error:', error.message);
        return false;
    }
}

export const loginUser = async ({email, password, login }: UserLoginDetails & {login: (userData: UserData) => void}): Promise<boolean> => {
    const loginUrl = 'http://localhost:4001/api/v1/auth/login';

    try {
        const response : AxiosResponse<UserData> = await axios.post(loginUrl,
            { email, password },
            { withCredentials: true }
        );

        if(response.status === 200) {
            login(response.data);
            return true;
        }

        console.error('Error in logging user');
        return false;

    } catch (error: any) {
        console.error('Login error:', error.message);
        return false;
    }
}

export const logoutUser = async ({logout}: {logout: () => {}}) => {
    logout();
}

export const logoutUpstoxAccount = async (upstoxUserId: string) => {
    try {
        const logoutUrl : string = `${config.BACKEND_BASE_URL}/auth/logoutUpstoxAccount`;

        const response = await axios.post(logoutUrl,
            {upstoxUserId: upstoxUserId} ,
            {withCredentials: true}
            );

        return response;
    }catch(error) {
        console.error("Error in logging out upstox account: ", error);
    }
}

export const removeUpstoxAccount = async (upstoxUserId: string) => {
    try {
        const removeUrl : string = `${config.BACKEND_BASE_URL}/dashboard/removeUpstoxUser`;

        const response = await axios.post(removeUrl, 
            {upstoxUserId},
            {withCredentials: true}
        );

        return response;
    } catch(error) {
        console.error("Error in removing the upstox account: ", error);
    }
}

