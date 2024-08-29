/**
 * @file LoginForm.tsx
 *
 * This React component provides a user login form for authentication.
 * It includes fields for entering a username and password, both of which are required.
 * The form is styled using Material-UI for input fields, buttons, and typography, while
 * Tailwind CSS is used for layout and additional styling.
 *
 * On form submission, the component sends the user's credentials to a Django backend.
 * If the login is successful, the access token received is stored in session storage.
 * The component also provides a link for users to navigate to a signup page if they do not have an account.
 *
 * @component
 *
 * @example
 * <LoginForm />
 *
 * @author Anirudha Jadhav <anirudhasj441@gmail.com>
 */

import React, { memo, useState } from "react";
import { TextField, Button, Link, Typography, Paper } from "@mui/material";
import { Link as RLink } from "react-router-dom";

const LoginForm: React.FC = () => {
    // State variables to manage the input fields for username and password
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    /**
     * Handles the form submission event by sending user credentials to the server.
     *
     * Prevents the default form submission behavior, sends a POST request with the
     * username and password to the Django backend, and stores the access token in
     * session storage if the login is successful.
     *
     * @param e - The form submission event object.
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent the default form submission behavior

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

            console.log("Login successful:", response);

            // Redirect or take further action here (e.g., navigate to a different page)
        } catch (error) {
            console.error("Error during login:", error);
            // Handle error (e.g., show an error message to the user)
        }
    };

    return (
        <>
            {/* Container for centering the form in the viewport */}
            <div className="h-full w-full flex justify-center items-center">
                {/* Form container with fixed width, padding, and column layout */}
                <Paper className="w-[500px] max-w-full mx-5" elevation={5} square={false}>
                    <div className="form-container h-full px-3 py-5 justify-center flex flex-col gap-3">
                        {/* Form title with styling */}
                        <Typography variant="h4" align="center">Login</Typography>
                        {/* Form element that handles user input */}
                        <form
                            action="#"
                            onSubmit={handleSubmit}
                            className="w-full flex flex-col gap-8 my-5"
                        >
                            <div className="flex-grow flex flex-col gap-8">
                                {/* Username input field with Material-UI styling */}
                                <TextField
                                    label="Username"
                                    variant="outlined"
                                    fullWidth
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                                {/* Password input field with Material-UI styling */}
                                <TextField
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {/* Submit button styled with Material-UI */}
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{
                                    paddingY: ".8rem",
                                }}
                            >
                                Login
                            </Button>
                        </form>
                        {/* Footer section with a link to the signup page */}
                        <div className="w-full flex gap-2 justify-center items-center">
                            <Typography>Don't have an account?</Typography>
                            <Typography>|</Typography>
                            <Link component={RLink} to={"/signup"}>
                                Create Account
                            </Link>
                        </div>
                    </div>
                </Paper>
            </div>
        </>
    );
};

// Memoize the component to avoid unnecessary re-renders
export default memo(LoginForm);
