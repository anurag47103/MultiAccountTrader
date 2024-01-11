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
    userId: number,
    userName: string,
    jwtToken: number;
}

export type AccountDetails = {
    username: string;
    userId: string;
};