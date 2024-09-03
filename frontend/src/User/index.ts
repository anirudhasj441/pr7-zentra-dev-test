import { IUserData } from "./types";

class User {
    private _isAuthenticated: boolean = false;

    private _access_token: string | null;

    private _username: string = "";

    private _firstName: string = "";

    private _lastName: string = "";

    private _email: string = "";

    public constructor() {
        this._access_token = sessionStorage.getItem("access_token");
        // this._checkUserAuthenticated().then((result) => {
        //     this._isAuthenticated = result;
        // });
    }

    public checkUserAuthenticated = async () => {
        const url = "http://127.0.0.1:8000/auth/get_user";

        try {
            console.log("::::::::::", this._access_token);
            if (this._access_token === null) return false;
            const res = await fetch(url, {
                headers: {
                    Authorization: "Bearer " + this._access_token,
                },
            });

            console.log(res.ok);

            if (!res.ok) throw new Error("User is not authenticated");

            const response = await res.json();

            console.log(response);

            this._username = response.payload.username;
            this._firstName = response.payload.first_name;
            this._lastName = response.payload.last_name;
            this._email = response.payload.email;

            this._isAuthenticated = true;
            return true;
        } catch (error) {
            console.error("Error during login:", error);
            return false;
        }
    };

    public login = async (
        username: string,
        password: string,
    ): Promise<boolean> => {
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

            if (!res.ok) {
                throw new Error("Login failed");
            }

            const response = await res.json();

            // Store the access token in session storage
            sessionStorage.setItem("access_token", response.access);
            this._access_token = response.access;
            console.log("Login successful:", response);

            this._username = response.user.username;
            this._firstName = response.user.first_name;
            this._lastName = response.user.last_name;
            this._email = response.user.email;
            this._isAuthenticated = true;

            return true;

            // Redirect or take further action here (e.g., navigate to a different page)
        } catch (error) {
            console.error("Error during login:", error);
            // Handle error (e.g., show an error message to the user)
            return false;
        }
    };

    public logout = () => {
        sessionStorage.removeItem("access_token");
        this._access_token = null;
        this._isAuthenticated = false;
    };

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

            const response = await res.json();

            console.log(response);
            return true;
        } catch (error) {
            console.error("Error during login:", error);

            return false;
        }
    };

    public getAllUsers = async () => {
        const url = "http://127.0.0.1:8000/list_users";

        try {
            const res = await fetch(url, {
                headers: {
                    Authorization: "Bearer " + this._access_token,
                },
            });

            if (!res.ok) throw new Error("Something went wrong");

            const response = await res.json();

            return response.payload;
        } catch (error) {
            console.error(error);
        }
    };

    public checkRequestSent = async (username: string) => {
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

            if (!res.ok) throw new Error("Something went wrong.");

            const response = await res.json();

            return response.request_sent;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    public sendRequest = async (username: string) => {
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

            if (!res.ok) throw new Error("Something went wrong.");

            const response = await res.json();

            console.log(response);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    public getRequests = async () => {
        const url = "http://127.0.0.1:8000/request";

        try {
            const res = await fetch(url, {
                headers: {
                    Authorization: "Bearer " + this._access_token,
                },
            });

            if (!res.ok) throw new Error("Something went wrong.");

            const response = await res.json();

            console.log(response);
            return response.payload;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    public updateRequestStatus = async (requestId: number, status: string) => {
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
            if (!res.ok) throw new Error("Something went wrong");

            const response = await res.json();

            console.log(response);

            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    public getChats = async () => {
        const url = "http://127.0.0.1:8000/chats";

        try {
            const res = await fetch(url, {
                headers: {
                    Authorization: "Bearer " + this._access_token,
                },
            });

            if (!res.ok) throw new Error("Some thing wen wrong.");

            const response = await res.json();

            console.log("CHATS:::::::", response);

            return response.payload;
        } catch (error) {
            console.error(error);
        }
    };

    public getMessages = async (chat_id: string) => {
        const url = "http://127.0.0.1:8000/messages?chat_id=" + chat_id;

        try {
            const res = await fetch(url, {
                headers: {
                    Authorization: "Bearer " + this._access_token,
                },
            });

            if (!res.ok) throw new Error("Something went wrond");

            const response = await res.json();

            return response.payload;
        } catch (error) {
            console.error(error);
        }
    };

    public get isAuthenticated(): boolean {
        return this._isAuthenticated;
    }

    public set isAuthenticated(value: boolean) {
        this._isAuthenticated = value;
    }

    public get username(): string {
        return this._username;
    }
    public get firstName(): string {
        return this._firstName;
    }
    public get lastName(): string {
        return this._lastName;
    }
    public get email(): string {
        return this._email;
    }
}

export default User;
