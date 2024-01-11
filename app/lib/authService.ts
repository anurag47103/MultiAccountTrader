import axios, {AxiosResponse} from 'axios'
import config from "@/config/config";
import {UserLoginDetails, UserRegistrationDetails, UserData} from "@/types/types";
import {useAuth} from "@/lib/AuthContext";
export const getAuthUrl = async (): Promise<string> => {

    try {
        const getAuthUrl = config.REACT_APP_GET_AUTH_URL;
        console.log(getAuthUrl)
        const response = await axios.get(getAuthUrl);

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

export const registerUser = async ({ name, email, password }: UserRegistrationDetails): Promise<void> => {
    const registerUrl = 'http://localhost:4001/auth/register';

    try {
        const response = await axios.post(registerUrl, {
            name,
            email,
            password
        });

        console.log('Registration successful:', response.data);
        // You can also return response data if needed
    } catch (error: any) {
        console.error('Registration error:', error.message);
        // Optionally, rethrow the error or handle it as needed
    }
}

export const loginUser = async ({email, password, login }: UserLoginDetails & {login: (userData: UserData) => void}): Promise<void> => {
    const loginUrl = 'http://localhost:4001/auth/login';

    try {
        const response : AxiosResponse<UserData> = await axios.post(loginUrl, {
            email,
            password
        });

        console.log('Login successful:', response.data.userName);
        console.log(response)


        login(response.data);
        // You can also return response data if needed
    } catch (error: any) {
        console.error('Login error:', error.message);
        // Optionally, rethrow the error or handle it as needed
    }
}

export const logoutUser = async ({logout}: {logout: () => {}}) => {
    logout();
}
