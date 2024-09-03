/**
 * @file MainLayout.tsx
 *
 * This file defines the `MainLayout` component, which serves as a layout wrapper
 * for the application. It uses `Outlet` from `react-router-dom` to render
 * nested routes and their components within the layout.
 *
 * The `MainLayout` component provides a consistent structure for the application,
 * ensuring that the content of nested routes is displayed within the specified
 * layout area. In this case, it sets the width and height of the container to
 * viewport size units.
 *
 * @component
 *
 * @see {@link https://reactrouter.com/docs/en/v6/components/outlet} for more information on `Outlet`.
 *
 * @author Anirudha Jadhav <anirudhasj441@gmail.com>
 */

import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import userContext from "../User/context";

/**
 * MainLayout component that wraps nested routes with a consistent layout.
 *
 * The component uses `Outlet` from `react-router-dom` to render the content
 * of nested routes.
 *
 * @returns {JSX.Element} The rendered layout with nested route content.
 */
const MainLayout: React.FC = () => {
    const mounted = useRef(false);

    const user = useContext(userContext);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (mounted.current) return;
        user.checkUserAuthenticated().then((result) => {
            console.log("??????????????", result, ":: ", user.firstName);

            setFirstName(user.firstName);
            setLastName(user.lastName);
            if (!result) {
                navigate("/login");
            }
        });

        return () => {
            mounted.current = true;
        };
    }, [user, navigate]);

    const handleLogoutBtnClick = async () => {
        user.logout();
        navigate("/login");
    };

    return (
        <div className="w-svw h-svh flex flex-col overflow-y-auto">
            {!["/login", "/signup"].includes(location.pathname) ? (
                <AppBar position="static">
                    <Toolbar>
                        <div>
                            <Typography variant="h5">
                                {firstName} {lastName}
                            </Typography>
                        </div>

                        <div className="flex-grow"></div>
                        <Button color="inherit" onClick={handleLogoutBtnClick}>
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>
            ) : (
                <></>
            )}

            {/* The Outlet component will render the content of nested routes here */}
            <div className="flex-grow overflow-y-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;
