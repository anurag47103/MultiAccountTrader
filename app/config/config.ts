const REACT_APP_REDIRECT_URI = process.env.NEXT_PUBLIC_REACT_APP_REDIRECT_URI || '';
const REACT_APP_GET_AUTH_URL = process.env.NEXT_PUBLIC_REACT_APP_GET_AUTH_URL || '';
const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || '';
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';
const NODE_ENV = process.env.NEXT_PUBLIC_NODE_ENV || '';

export default {
    REACT_APP_REDIRECT_URI,
    REACT_APP_GET_AUTH_URL,
    BACKEND_BASE_URL,
    BACKEND_URL,
    NODE_ENV
};
