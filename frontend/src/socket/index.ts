import { io, Socket } from "socket.io-client";

const mainSocket: Socket = io("http://127.0.0.1:8000");

export default mainSocket;
