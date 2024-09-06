/**
 * @file index.ts
 *
 * @brief Configures and exports the main socket connection.
 *
 * @details This file establishes a socket connection to the server using `socket.io-client`.
 *          It exports the configured socket instance for use throughout the application.
 *
 * @example
 * import mainSocket from "../socket";
 *
 * @author Anirudha Jadhav <anirudhasj441@gmail.com>
 */

import { io, Socket } from "socket.io-client";

/**
 * @constant mainSocket
 * @type {Socket}
 * @default
 * @description The main socket instance used for communication with the server.
 *              This socket is configured to connect to the server.
 */
const mainSocket: Socket = io(
    import.meta.env.VITE_BACKEND_URL ?? "http://127.0.0.1:8000",
);

export default mainSocket;
