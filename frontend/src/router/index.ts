/**
 * @file index.ts
 *
 * This file sets up and exports the router configuration for the application.
 * It uses `createBrowserRouter` from `react-router-dom` to create a router
 * instance based on the defined routes.
 *
 * @module
 *
 * @author Anirudha Jadhav <anirudhasj441@gmail.com>
 */

import { createBrowserRouter } from "react-router-dom";
import routes from "./routes";

const router = createBrowserRouter(routes);

export default router;
