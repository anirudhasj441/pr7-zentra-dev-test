/**
 * @file LoginForm.tsx
 *
 * A React component for user authentication with a login form.
 *
 * This component displays a form with fields for entering a username and password.
 * It uses Material-UI for input fields and buttons, and Tailwind CSS for layout and styling.
 * The form includes a link for users to navigate to a signup page if they do not have an account.
 *
 * @component
 *
 * @example
 * <LoginForm />
 *
 * @author Anirudha Jadhav <anirudhasj441@gmail.com>
 */

import React, { memo, useState } from "react";
import { TextField, Button, Link } from "@mui/material";
import { Link as RLink } from "react-router-dom";

const LoginForm: React.FC = () => {
    // State variables to manage form input
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    /**
     * Handles the form submission event.
     *
     * Prevents the default form submission behavior and logs the username and
     * password to the console for demonstration purposes.
     *
     * @param e - The form submission event object.
     */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Prevents the default action of form submission

        // Logs user credentials to the console (for development/testing purposes)
        console.log("username: ", username);
        console.log("password: ", password);
    };

    return (
        <>
            {/* Container for centering the form in the viewport */}
            <div className="h-full w-full flex justify-center items-center">
                {/* Form container with fixed width, padding, and column layout */}
                <div className="form-container w-[500px] h-full max-w-full px-3 py-5 flex flex-col gap-3">
                    {/* Form title with styling */}
                    <div className="text-3xl text-center font-bold">Login</div>
                    {/* Form element that handles user input */}
                    <form
                        action="#"
                        onSubmit={handleSubmit}
                        className="w-full flex flex-col gap-5 flex-grow my-5"
                    >
                        <div className="flex-grow flex flex-col gap-5">
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
                        <span>Don't have an account?</span>
                        <span>|</span>
                        <Link component={RLink} to={"/signup"}>
                            Create Account
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

// Memoize the component to avoid unnecessary re-renders
export default memo(LoginForm);
