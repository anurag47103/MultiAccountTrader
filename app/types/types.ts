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
};

