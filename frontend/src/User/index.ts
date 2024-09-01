import { IUserData } from "./types";

class User {
    private _isAuthenticated: boolean = false;

    private _access_token: string | null;

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

            this._isAuthenticated = true;

            return true;

            // Redirect or take further action here (e.g., navigate to a different page)
        } catch (error) {
            console.error("Error during login:", error);
            // Handle error (e.g., show an error message to the user)
            return false;
        }
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

    public get isAuthenticated(): boolean {
        return this._isAuthenticated;
    }

    public set isAuthenticated(value: boolean) {
        this._isAuthenticated = value;
    }
}

export default User;
