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

import React from "react";
import { Outlet } from "react-router-dom";

/**
 * MainLayout component that wraps nested routes with a consistent layout.
 *
 * The component uses `Outlet` from `react-router-dom` to render the content
 * of nested routes.
 *
 * @returns {JSX.Element} The rendered layout with nested route content.
 */
const MainLayout: React.FC = () => {
    return (
        <div className="w-svw h-svh">
            {/* The Outlet component will render the content of nested routes here */}
            <Outlet />
        </div>
    );
};

export default MainLayout;
