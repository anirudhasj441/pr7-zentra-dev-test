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

import React, { memo, useContext, useState, useEffect, useRef } from "react";
import {
    TextField,
    Button,
    Link,
    Typography,
    Paper,
    Alert,
} from "@mui/material";
import { Link as RLink, useNavigate } from "react-router-dom";
import userContext from "../User/context";

const LoginForm: React.FC = () => {
    const mounted = useRef(false);

    // State variables to manage the input fields for username and password
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [showAlert, setShowAlert] = useState<boolean>(false);

    const user = useContext(userContext);

    const navigate = useNavigate();

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

        const result = await user.login(username, password);

        if (result) {
            navigate("/");
        } else {
            setShowAlert(true);
        }
    };

    useEffect(() => {
        if (mounted.current) return;
        user.checkUserAuthenticated().then((result) => {
            console.log(result);
            if (result) {
                navigate("/");
            }
        });

        return () => {
            mounted.current = true;
        };
    }, [user, navigate]);

    return (
        <>
            {/* Container for centering the form in the viewport */}
            <div className="h-full w-full flex justify-center items-center">
                {showAlert ? (
                    <Alert
                        severity="error"
                        variant="filled"
                        onClose={() => setShowAlert(false)}
                        className=" fixed top-5 left-1/2 -translate-x-1/2"
                    >
                        Oops! The username or password you entered is incorrect.
                    </Alert>
                ) : (
                    <></>
                )}

                {/* Form container with fixed width, padding, and column layout */}
                <Paper
                    className="w-[500px] max-w-full mx-5"
                    elevation={5}
                    square={false}
                >
                    <div className="form-container h-full px-3 py-5 justify-center flex flex-col gap-3">
                        {/* Form title with styling */}
                        <Typography variant="h4" align="center">
                            Login
                        </Typography>
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
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    required
                                />
                                {/* Password input field with Material-UI styling */}
                                <TextField
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
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
