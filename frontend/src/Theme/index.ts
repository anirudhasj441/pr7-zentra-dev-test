/**
 * @file index.ts
 *
 * Theme configuration file for Material-UI.
 *
 * This file defines a custom theme for the Material-UI components used in the application.
 * The theme includes color palette settings for primary and secondary colors and sets the
 * color mode to dark. The theme is then exported for use throughout the application.
 *
 * @module
 */

import { Theme } from "@emotion/react";
import { createTheme } from "@mui/material";
// import { purple } from "@mui/material/colors";

/**
 * The main theme configuration for the application.
 *
 * This theme uses Material-UI's `createTheme` function to define custom color settings
 * and other theme properties. The palette is set to dark mode with specific primary and
 * secondary colors.
 *
 * @constant
 * @type {Theme}
 */

const mainTheme: Theme = createTheme({
    palette: {
        mode: "dark", // Sets the theme to dark mode
        primary: {
            main: "#29b6f6"
        },
        secondary: {
            main: "#262626", // Sets the secondary color to a shade of red
        },
    }
});

export const customTheme: Theme = createTheme({
    palette: {
        mode: "light", // Sets the theme to dark mode
        primary: {
            main: "#29b6f6",

        },
        secondary: {
            main: "#f44336", // Sets the secondary color to a shade of red
        },
        background: {
            default: "#9ccde6",
            paper: "#8d9da44f"
        }
    }
})

export default mainTheme;
