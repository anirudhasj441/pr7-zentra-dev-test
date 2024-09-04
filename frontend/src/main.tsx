/**
 * @file main.tsx
 *
 * The entry point for the React application. This file sets up the React rendering
 * process by importing necessary modules and rendering the root component into
 * the DOM. It is responsible for initializing the React application and applying
 * global configurations like React's strict mode and routing.
 *
 * @module
 *
 * @see {@link https://reactjs.org/docs/strict-mode.html} for more information on React StrictMode.
 * @see {@link https://reactrouter.com/docs/en/v6/getting-started} for more information on `RouterProvider`.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import mainTheme from "./Theme";
import { CssBaseline } from "@mui/material";
import router from "./router";
import User from "./User";
import "./index.css";
import userContext from "./User/context";

const user = new User();

/**
 * Initializes the root of the React application and renders the root component.
 *
 * This function:
 * - Uses `createRoot` from `react-dom/client` to create a root container for
 *   rendering the React application.
 * - Wraps the application in `StrictMode` to enable additional checks and warnings
 *   for its descendants. StrictMode helps identify potential problems in the
 *   application during development.
 * - Utilizes `RouterProvider` from `react-router-dom` to provide routing functionality
 *   to the application. The `router` object, imported from `./router`, defines the
 *   routing configuration.
 * - Imports `index.css` for global styles.
 *
 * @function
 */
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider theme={mainTheme}>
            <CssBaseline />
            <userContext.Provider value={user}>
                <RouterProvider router={router} />
            </userContext.Provider>
        </ThemeProvider>
    </StrictMode>,
);
