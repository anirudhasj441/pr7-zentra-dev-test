export interface IUserData {
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    password?: string;
    request_sent?: boolean;
}

export interface IRequestData {
    id: number,
    request_from: IUserData,
    request_to: IUserData,
    status: "pending" | "accept" | "reject"
}
