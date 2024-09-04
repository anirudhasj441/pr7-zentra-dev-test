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
import { Suspense } from "react";
import IndexPage from "../pages/IndexPage";
import LoginForm from "../pages/LoginForm";
import SignUpForm from "../pages/SignUpForm";
import ChatBox from "../components/ChatBox";

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
