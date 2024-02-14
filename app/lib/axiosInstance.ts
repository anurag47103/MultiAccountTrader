import config from '@/config/config';
import { UserData } from '@/types/types';
import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

// Function to create an Axios instance with default configurations
let axiosInstance : AxiosInstance | null = null;

const getAxiosInstance = (): AxiosInstance => {

    if(axiosInstance) return axiosInstance;

    axiosInstance = axios.create({
        baseURL: config.BACKEND_BASE_URL, // Your API base URL
        timeout: 5000, // Request timeout
    });

    // Add a request interceptor to add the token to each request
    axiosInstance.interceptors.request.use(
        (config) => {
            console.log('interceptor called...')
            const localStorageData = localStorage.getItem('user');
            if(!localStorageData) {
                console.error("No data in localstorage");
                return Promise.reject('No data in localStorage')
            }
            const user: UserData = JSON.parse(JSON.parse(localStorageData).value);
            console.log(user)
            const token: string = user.token;
            console.log(token);
            if (token) {
                config.headers = config.headers || {}; // Initialize if undefined
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            console.log(config)
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return axiosInstance;
};

export default getAxiosInstance;