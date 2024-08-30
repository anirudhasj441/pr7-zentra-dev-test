import React, { memo, useState } from "react";
import { Button, TextField, Link, Paper, Typography } from "@mui/material";
import { Link as RLink } from "react-router-dom";

/**
 * @file SignUpForm.tsx
 *
 * A React component for user registration, featuring a multi-step sign-up form.
 *
 * The form guides the user through several steps to complete the registration process:
 * - Step 1: Enter first and last name
 * - Step 2: Enter email address
 * - Step 3: Choose a username
 * - Step 4: Set a password
 *
 * This component uses Material-UI for input fields, buttons, and typography,
 * while Tailwind CSS is applied for layout and additional styling.
 * Users can navigate to the login page if they already have an account.
 *
 * @component
 *
 * @example
 * <SignUpForm />
 *
 * @author Anirudha Jadhav <anirudhasj441@gmail.com>
 */

const SignUpForm: React.FC = () => {
    // State variables to manage the user input fields
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    /**
     * Handles the form submission event to create a new user account.
     *
     * Prevents the default form submission behavior, gathers user input,
     * and sends the data to the server to register a new account.
     * Logs the server's response to the console.
     *
     * @async
     * @function
     * @param {React.FormEvent} e - The form submission event object.
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = "http://127.0.0.1:8000/auth/signup";

        const data = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            username: username,
            password: password,
        };

        const res = await fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const response = await res.json();
        console.log(response);
    };

    /**
     * Checks the availability of a username by querying the server.
     *
     * Sends a POST request to the server to verify if the provided username is available.
     * Returns `true` if the username is available, otherwise `false`.
     *
     * @async
     * @function
     * @param {string} username - The username to check.
     * @returns {Promise<boolean>} A promise resolving to `true` if the username is available,
     *                             or `false` otherwise.
     */
    const checkUsernameAvailability = async (username: string) => {
        const url = "http://127.0.0.1:8000/auth/username_availability";

        const res = await fetch(url, {
            method: "POST",
            body: JSON.stringify({ username: username }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const response = await res.json();
        return response.user_available === true;
    };

    return (
        <>
            {/* Container for centering the form in the viewport */}
            <div className="h-full w-full flex justify-center items-center">
                {/* Form container with fixed width, padding, and column layout */}
                <Paper elevation={12} className="w-[500px] max-w-full mx-5" square={false}>
                    <div className="form-container h-full px-3 py-5 flex flex-col justify-between gap-3">
                        {/* Form title with styling */}
                        <Typography variant="h4" align="center">Create a New Account</Typography>
                        {/* Form content with dynamic steps */}
                        <form action="#" onSubmit={handleSubmit} className="w-full my-5 flex flex-col gap-8 justify-between">
                            <div className="flex flex-col gap-8">
                                {/* Render fields based on the active step */}
                                <div className="flex gap-5">
                                    <TextField
                                        label="First Name"
                                        variant="outlined"
                                        fullWidth
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                    />
                                    <TextField
                                        label="Last Name"
                                        variant="outlined"
                                        fullWidth
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                    />
                                </div>
                                <TextField
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <TextField
                                    label="Username"
                                    variant="outlined"
                                    fullWidth
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    onBlur={(e) => checkUsernameAvailability(e.target.value)}
                                    required
                                />
                                <TextField
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                {/* Submit button to create a new account */}
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    sx={{
                                        paddingY: ".8rem",
                                    }}
                                >
                                    Create Account
                                </Button>
                            </div>
                        </form>
                        {/* Footer section with a link to the login page */}
                        <div className="w-full flex gap-2 justify-center items-center">
                            <Typography>Already have an account?</Typography>
                            <Typography>|</Typography>
                            <Link component={RLink} to={"/login"}>
                                Login
                            </Link>
                        </div>
                    </div>
                </Paper>
            </div>
        </>
    );
};

// Memoize the component to avoid unnecessary re-renders
export default memo(SignUpForm);
