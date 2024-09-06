/**
 * @file routes.tsx
 *
 * This file defines the route configuration for the application.
 * It sets up the routing structure using `react-router-dom`, specifying
 * the paths and their associated components.
 *
 * @module
 *
 * @author Anirudha Jadhav <anirudhasj441@gmail.com>
 */

import { RouteObject } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import React, { Suspense } from "react";

// eslint-disable-next-line react-refresh/only-export-components
const ChatBox = React.lazy(() => import("../components/ChatBox"))
// eslint-disable-next-line react-refresh/only-export-components
const SignUpForm = React.lazy(() => import("../pages/SignUpForm"));
// eslint-disable-next-line react-refresh/only-export-components
const LoginForm = React.lazy(() => import("../pages/LoginForm"));
// eslint-disable-next-line react-refresh/only-export-components
const IndexPage = React.lazy(() => import("../pages/IndexPage"));


const routes: RouteObject[] = [
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "",
                element: (
                    <Suspense fallback={<h1>Loading</h1>}>
                        <IndexPage />
                    </Suspense>
                ),
                children: [
                    {
                        path: "chat/:chat_id",
                        element: (
                            <Suspense fallback={<h1>Loading</h1>}>
                                <ChatBox />
                            </Suspense>
                        ),
                    },
                ],
            },
            {
                path: "login",
                element: (
                    <Suspense fallback={<h1>Loading</h1>}>
                        <LoginForm />
                    </Suspense>
                ),
            },
            {
                path: "signup",
                element: (
                    <Suspense fallback={<h1>Loading</h1>}>
                        <SignUpForm />
                    </Suspense>
                ),
            },
        ],
    },
];

export default routes;
