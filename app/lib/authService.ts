import axios, {AxiosResponse} from 'axios'
import config from "@/config/config";
import {UserLoginDetails, UserRegistrationDetails, UserData} from "@/types/types"
export const getAuthUrl = async (): Promise<string> => {

    try {
        const getAuthUrl = config.REACT_APP_GET_AUTH_URL;
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

export const registerUser = async ({ name, email, password }: UserRegistrationDetails): Promise<void> => {
    const registerUrl = 'http://localhost:4001/api/v1/auth/register';

    try {
        const response = await axios.post(registerUrl, {
            name,
            email,
            password
        });

        console.log('Registration successful:', response.data);
    } catch (error: any) {
        console.error('Registration error:', error.message);
    }
}

export const loginUser = async ({email, password, login }: UserLoginDetails & {login: (userData: UserData) => void}): Promise<void> => {
    const loginUrl = 'http://localhost:4001/api/v1/auth/login';

    try {
        const response : AxiosResponse<UserData> = await axios.post(loginUrl,
            {
                email,
                password
            },
            {
                withCredentials: true // Necessary for cookies to be sent and received
            }
);

        console.log('Login successful:', response.data.username);

        login(response.data);
    } catch (error: any) {
        console.error('Login error:', error.message);
    }
}

export const logoutUser = async ({logout}: {logout: () => {}}) => {
    logout();
}
