import React, { memo, useState } from "react";
import { Button, TextField, Link } from "@mui/material";
import { Link as RLink } from "react-router-dom";

/**
 * @file SignUpForm.tsx
 *
 * A React component for user registration with a multi-step sign-up form.
 *
 * This component displays a form that progresses through multiple steps:
 * - Entering first and last name
 * - Entering email
 * - Entering a username
 * - Entering a password
 *
 * It uses Material-UI components for input fields and buttons, and Tailwind CSS
 * for layout and styling. The form also includes a navigation link to the login page.
 *
 * @component
 *
 * @example
 * <SignUpForm />
 *
 * @author Anirudha Jadhav <anirudhasj441@gmail.com>
 */
const SignUpForm: React.FC = () => {
    // State variables to manage the current step of the form and user input
    const [activeStep, setActiveStep] = useState<number>(0);
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    /**
     * Handles the form submission event.
     *
     * Prevents the default form submission behavior and logs user details to the console
     * for demonstration purposes. This is typically where form data would be submitted
     * to a server.
     *
     * @param e - The form submission event object.
     */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Prevents the default form submission action

        // Logs user credentials to the console (for development/testing purposes)
        console.log("username: ", username);
        console.log("password: ", password);
    };

    return (
        <>
            {/* Container for centering the form in the viewport */}
            <div className="h-full w-full flex justify-center items-center">
                {/* Form container with fixed width, padding, and column layout */}
                <div className="form-container w-[500px] h-full max-w-full px-3 py-5 flex flex-col justify-between gap-3">
                    {/* Form title with styling */}
                    <div className="text-3xl text-center font-bold">
                        Create a New Account
                    </div>
                    {/* Form content with dynamic steps */}
                    <div className="w-full flex-grow my-5 flex flex-col gap-5 justify-between">
                        <div className="">
                            {/* Render fields based on the active step */}
                            {activeStep === 0 && (
                                <div className="flex flex-col gap-5">
                                    <TextField
                                        label="First Name"
                                        variant="outlined"
                                        fullWidth
                                        value={firstName}
                                        onChange={(e) =>
                                            setFirstName(e.target.value)
                                        }
                                        required
                                    />
                                    <TextField
                                        label="Last Name"
                                        variant="outlined"
                                        fullWidth
                                        value={lastName}
                                        onChange={(e) =>
                                            setLastName(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                            )}
                            {activeStep === 1 && (
                                <TextField
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            )}
                            {activeStep === 2 && (
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
                            )}
                            {activeStep === 3 && (
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
                            )}
                        </div>

                        {/* Conditional button based on the current step */}
                        {activeStep === 3 ? (
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={handleSubmit}
                                sx={{
                                    paddingY: ".8rem",
                                }}
                            >
                                Create Account
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={() =>
                                    setActiveStep(
                                        activeStep < 3 ? activeStep + 1 : 3,
                                    )
                                }
                                sx={{
                                    paddingY: ".8rem",
                                }}
                            >
                                Next
                            </Button>
                        )}
                    </div>
                    {/* Footer section with a link to the login page */}
                    <div className="w-full flex gap-2 justify-center items-center">
                        <span>Already have an account?</span>
                        <span>|</span>
                        <Link component={RLink} to={"/login"}>
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

// Memoize the component to avoid unnecessary re-renders
export default memo(SignUpForm);
