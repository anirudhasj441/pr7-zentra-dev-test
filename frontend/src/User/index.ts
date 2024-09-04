/**
 * @file User/index.ts
 *
 * @brief Manages user authentication, profile data, and interactions with the server.
 *
 * @description
 * The `User` class provides methods for user authentication, signup, managing requests, and handling chat functionality. It includes functionality to check user authentication, login, logout, and fetch user-related data from the server.
 *
 * @author Anirudha Jadhav <anirudhasj441@gmail.com>
 */

import { IUserData } from "./types";

/**
 * @class User
 * @brief Handles user authentication, profile management, and interactions with the server.
 *
 * @description
 * This class manages user state, including authentication status, profile information, and access tokens. It provides methods to login, logout, signup, and fetch various types of data from the server, such as user lists, requests, and chats.
 */
class User {
    private _isAuthenticated: boolean = false;
    private _access_token: string | null;
    private _username: string = "";
    private _firstName: string = "";
    private _lastName: string = "";
    private _email: string = "";

    /**
     * @constructor
     * @brief Initializes a new `User` instance and retrieves the access token from session storage.
     */
    public constructor() {
        this._access_token = sessionStorage.getItem("access_token");
    }

    /**
     * @method checkUserAuthenticated
     * @async
     * @brief Checks if the user is authenticated by verifying the access token.
     * @returns {Promise<boolean>} Returns `true` if the user is authenticated, otherwise `false`.
     */
    public checkUserAuthenticated = async (): Promise<boolean> => {
        const url = "http://127.0.0.1:8000/auth/get_user";

        try {
            if (this._access_token === null) return false;

            const res = await fetch(url, {
                headers: {
                    Authorization: "Bearer " + this._access_token,
                },
            });

            if (!res.ok) throw new Error("User is not authenticated");

            const response = await res.json();

            this._username = response.payload.username;
            this._firstName = response.payload.first_name;
            this._lastName = response.payload.last_name;
            this._email = response.payload.email;

            this._isAuthenticated = true;
            return true;
        } catch (error) {
            console.error("Error during authentication check:", error);
            return false;
        }
    };

    /**
     * @method login
     * @async
     * @brief Logs in the user by sending credentials to the server and storing the access token.
     * @param username - The username of the user.
     * @param password - The password of the user.
     * @returns {Promise<boolean>} Returns `true` if login is successful, otherwise `false`.
     */
    public login = async (username: string, password: string): Promise<boolean> => {
        const url = "http://127.0.0.1:8000/auth/login";

        const data = {
            username: username,
            password: password,
        };

        try {
            const res = await fetch(url, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) throw new Error("Login failed");

            const response = await res.json();

            sessionStorage.setItem("access_token", response.access);
            this._access_token = response.access;

            this._username = response.user.username;
            this._firstName = response.user.first_name;
            this._lastName = response.user.last_name;
            this._email = response.user.email;
            this._isAuthenticated = true;

            return true;
        } catch (error) {
            console.error("Error during login:", error);
            return false;
        }
    };

    /**
     * @method logout
     * @brief Logs out the user by removing the access token and updating authentication status.
     */
    public logout = () => {
        sessionStorage.removeItem("access_token");
        this._access_token = null;
        this._isAuthenticated = false;
    };

    /**
     * @method signup
     * @async
     * @brief Signs up a new user by sending user data to the server.
     * @param data - The user data for signup.
     * @returns {Promise<boolean>} Returns `true` if signup is successful, otherwise `false`.
     */
    public signup = async (data: IUserData): Promise<boolean> => {
        const url = "http://127.0.0.1:8000/auth/signup";

        try {
            const res = await fetch(url, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) throw new Error("Signup failed");

            return true;
        } catch (error) {
            console.error("Error during signup:", error);
            return false;
        }
    };

    /**
     * @method getAllUsers
     * @async
     * @brief Retrieves a list of all users from the server.
     * @returns {Promise<any>} Returns the list of users if successful, otherwise `undefined`.
     */
    public getAllUsers = async () => {
        const url = "http://127.0.0.1:8000/list_users";

        try {
            const res = await fetch(url, {
                headers: {
                    Authorization: "Bearer " + this._access_token,
                },
            });

            if (!res.ok) throw new Error("Failed to fetch users");

            const response = await res.json();

            return response.payload;
        } catch (error) {
            console.error("Error during fetching users:", error);
        }
    };

    /**
     * @method checkRequestSent
     * @async
     * @brief Checks if a request has already been sent to a specific user.
     * @param username - The username of the user to check.
     * @returns {Promise<boolean>} Returns `true` if the request has been sent, otherwise `false`.
     */
    public checkRequestSent = async (username: string): Promise<boolean> => {
        const url = "http://127.0.0.1:8000/check_request_sent";

        const data = {
            username: username,
        };

        try {
            const res = await fetch(url, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "Application/json",
                    Authorization: "Bearer " + this._access_token,
                },
            });

            if (!res.ok) throw new Error("Failed to check request status");

            const response = await res.json();

            return response.request_sent;
        } catch (error) {
            console.error("Error during request check:", error);
            return false;
        }
    };

    /**
     * @method sendRequest
     * @async
     * @brief Sends a friend request to a specific user.
     * @param username - The username of the user to send the request to.
     * @returns {Promise<boolean>} Returns `true` if the request is sent successfully, otherwise `false`.
     */
    public sendRequest = async (username: string): Promise<boolean> => {
        const url = "http://127.0.0.1:8000/request";

        try {
            const data = {
                request_to: username,
            };
            const res = await fetch(url, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "Application/json",
                    Authorization: "Bearer " + this._access_token,
                },
            });

            if (!res.ok) throw new Error("Failed to send request");

            const response = await res.json();
            console.log(response)
            return true;
        } catch (error) {
            console.error("Error during sending request:", error);
            return false;
        }
    };

    /**
     * @method getRequests
     * @async
     * @brief Retrieves a list of all requests sent to the user.
     * @returns {Promise<any>} Returns the list of requests if successful, otherwise `false`.
     */
    public getRequests = async () => {
        const url = "http://127.0.0.1:8000/request";

        try {
            const res = await fetch(url, {
                headers: {
                    Authorization: "Bearer " + this._access_token,
                },
            });

            if (!res.ok) throw new Error("Failed to fetch requests");

            const response = await res.json();

            return response.payload;
        } catch (error) {
            console.error("Error during fetching requests:", error);
            return false;
        }
    };

    /**
     * @method updateRequestStatus
     * @async
     * @brief Updates the status of a specific request.
     * @param requestId - The ID of the request to update.
     * @param status - The new status of the request.
     * @returns {Promise<boolean>} Returns `true` if the status update is successful, otherwise `false`.
     */
    public updateRequestStatus = async (requestId: number, status: string): Promise<boolean> => {
        const url = "http://127.0.0.1:8000/request";

        const data = {
            request_id: requestId,
            status: status,
        };

        try {
            const res = await fetch(url, {
                method: "PATCH",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "Application/json",
                    Authorization: "Bearer " + this._access_token,
                },
            });
            if (!res.ok) throw new Error("Failed to update request status");

            const response = await res.json();
            console.log(response)
            return true;
        } catch (error) {
            console.error("Error during updating request status:", error);
            return false;
        }
    };

    /**
     * @method getChats
     * @async
     * @brief Retrieves a list of chats for the authenticated user.
     * @returns {Promise<any>} Returns the list of chats if successful, otherwise `undefined`.
     */
    public getChats = async () => {
        const url = "http://127.0.0.1:8000/chats";

        try {
            const res = await fetch(url, {
                headers: {
                    Authorization: "Bearer " + this._access_token,
                },
            });

            if (!res.ok) throw new Error("Failed to fetch chats");

            const response = await res.json();

            return response.payload;
        } catch (error) {
            console.error("Error during fetching chats:", error);
        }
    };

    /**
     * @method getMessages
     * @async
     * @brief Retrieves messages for a specific chat.
     * @param chat_id - The ID of the chat to retrieve messages for.
     * @returns {Promise<any>} Returns the messages for the chat if successful, otherwise `undefined`.
     */
    public getMessages = async (chat_id: string) => {
        const url = "http://127.0.0.1:8000/messages?chat_id=" + chat_id;

        try {
            const res = await fetch(url, {
                headers: {
                    Authorization: "Bearer " + this._access_token,
                },
            });

            if (!res.ok) throw new Error("Failed to fetch messages");

            const response = await res.json();

            return response.payload;
        } catch (error) {
            console.error("Error during fetching messages:", error);
        }
    };

    /**
     * @property isAuthenticated
     * @brief Gets or sets the authentication status of the user.
     * @type {boolean}
     */
    public get isAuthenticated(): boolean {
        return this._isAuthenticated;
    }

    public set isAuthenticated(value: boolean) {
        this._isAuthenticated = value;
    }

    /**
     * @property username
     * @brief Gets the username of the authenticated user.
     * @type {string}
     */
    public get username(): string {
        return this._username;
    }

    /**
     * @property firstName
     * @brief Gets the first name of the authenticated user.
     * @type {string}
     */
    public get firstName(): string {
        return this._firstName;
    }

    /**
     * @property lastName
     * @brief Gets the last name of the authenticated user.
     * @type {string}
     */
    public get lastName(): string {
        return this._lastName;
    }

    /**
     * @property email
     * @brief Gets the email address of the authenticated user.
     * @type {string}
     */
    public get email(): string {
        return this._email;
    }
}

export default User;
