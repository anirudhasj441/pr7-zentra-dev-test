/**
 * @file ChatBox/index.tsx
 *
 * @brief Component for displaying and sending chat messages.
 *
 * @component
 * The `ChatBox` component handles the chat interface, including displaying messages,
 * sending new messages, and managing socket connections for real-time updates.
 *
 * @example
 * <ChatBox />
 *
 * @author Anirudha Jadhav <anirudhasj441@gmail.com>
 */

import { Icon } from "@iconify/react/dist/iconify.js";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import React, { memo, useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import userContext from "../../User/context";
import { IMessageData } from "../../User/types";
import mainSocket from "../../socket";
import moment from "moment";

import "./style.scss";

/**
 * @function ChatBox
 * @brief Component for displaying and sending chat messages.
 * @details This component handles the chat interface, including displaying messages,
 *          sending new messages, and managing socket connections for real-time updates.
 * @returns {JSX.Element} The rendered chat box component.
 */
const ChatBox: React.FC = () => {
    const mounted = useRef(false);
    const { chat_id } = useParams<string>();
    const user = useContext(userContext);
    const messageContainer = useRef<HTMLDivElement | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [messages, setMessages] = useState<IMessageData[]>([]);
    const [msgText, setMsgText] = useState<string>("");
    const [connectionTimeout, setConnectionTimeout] = useState<boolean>(false);
    const oldChatId = useRef<string>("");

    /**
     * @function handleSendBtnClick
     * @brief Sends a message when the send button is clicked.
     * @details This function emits a `message:send` event with the message data to the socket server
     *          and clears the input field.
     */
    const handleSendBtnClick = () => {
        if (msgText.trim() === "") return;
        mainSocket.emit("message:send", {
            sender: user.username,
            chat_id: chat_id,
            message: msgText,
        });
        setMsgText("");
    };

    /**
     * @function handleNewMessage
     * @brief Adds a new message to the messages state.
     * @param {IMessageData} message - The new message data to add.
     */
    const handleNewMessage = (message: IMessageData) => {
        setMessages((messages) => [...messages, message]);
    };

    /**
     * @brief Effect hook to scroll the message container to the bottom whenever messages are updated.
     */
    useEffect(() => {
        if (messageContainer.current === null) return;
        messageContainer.current.scrollTop =
            messageContainer.current.scrollHeight;
    }, [messages]);

    /**
     * @function connectSocket
     * @brief Establishes the socket connection.
     */
    const connectSocket = async () => {
        if (mainSocket.connected) return;
        mainSocket.connect();
        await new Promise<void>((resolve: () => void) => {
            mainSocket.on("connect", resolve);
        });
        console.log("Connected...");
    };

    /**
     * @function connectToChat
     * @brief Connects to the specified chat room.
     * @param {string | undefined} chat_id - The chat room ID.
     */
    const connectToChat = async (chat_id: string | undefined) => {
        console.log(oldChatId.current, ":::", chat_id);
        if (!chat_id) return;
        if (oldChatId.current === chat_id) return;
        setLoading(true);
        mainSocket.emit("connect:chat", { chat_id: chat_id });

        await new Promise<void>((resolve: () => void) => {
            mainSocket.on("message:notification", (data) => {
                console.log(data);
                setLoading(false);
                resolve();
            });
        });

        oldChatId.current = chat_id;

        console.log("Connected to chat:", chat_id);
    };

    /**
     * @brief useEffect hook for managing socket connections and loading messages.
     * It sets up event listeners for new messages and handles connection errors.
     */
    useEffect(() => {
        const timeoutPromise = new Promise<never>(
            (_, reject) =>
                setTimeout(
                    () => reject(new Error("Connection timed out")),
                    30000,
                ), // 30 seconds
        );

        const createSocketConnection = async () => {
            if (!mainSocket.connected) {
                await connectSocket();
            }
            try {
                await Promise.race([connectToChat(chat_id), timeoutPromise]);
            } catch (error) {
                console.error(error);
                setConnectionTimeout(true);
            }
        };

        console.log("ChatBox mounted!");

        createSocketConnection();

        mainSocket.on("message:recieve", (data: IMessageData) => {
            console.log("New Message", data);
            handleNewMessage(data);
        });

        mainSocket.on("connect_error", (error) => {
            console.error("WebSocket connection error:", error);
        });

        mainSocket.on("disconnect", (reason) => {
            console.warn("WebSocket disconnected:", reason);
        });

        setMessages([]);
        if (chat_id)
            user.getMessages(chat_id).then((messages: IMessageData[]) => {
                if (messageContainer.current === null) return;
                setMessages(messages);
                messageContainer.current.scrollTop =
                    messageContainer.current.scrollHeight;
            });

        return () => {
            mounted.current = true;
            mainSocket.off("message:recieve");
            mainSocket.off("message:notification");
            if (mainSocket.connected) mainSocket.disconnect();
        };
    }, [user, chat_id]);

    return (
        <>
            <div className="h-full w-full flex flex-col py-3">
                {connectionTimeout ? (
                    <Typography variant="h6">Connection Error...</Typography>
                ) : (
                    <>
                        {loading ? (
                            <Typography variant="h6">
                                Connecting to server...
                            </Typography>
                        ) : (
                            <>
                                <div
                                    ref={messageContainer}
                                    className="messages flex-grow w-full overflow-y-auto px-3"
                                >
                                    {messages.map((message: IMessageData) => (
                                        <div
                                            key={message.id}
                                            className={[
                                                "chat w-full",
                                                message.sender.username ===
                                                user.username
                                                    ? "text-right"
                                                    : "",
                                            ].join(" ")}
                                        >
                                            <Box
                                                sx={{
                                                    bgcolor:
                                                        message.sender
                                                            .username ===
                                                        user.username
                                                            ? "primary.main"
                                                            : "#4a4b4b",
                                                    width: "fit-content",
                                                    paddingX: "0.5rem",
                                                    paddingY: "0.3rem",
                                                    borderRadius: "1rem",
                                                    marginLeft:
                                                        message.sender
                                                            .username ===
                                                        user.username
                                                            ? "auto"
                                                            : "",
                                                }}
                                            >
                                                <Typography align="right">
                                                    {message.text}
                                                </Typography>
                                            </Box>
                                            <Typography variant="caption">
                                                {moment(
                                                    message.created_at,
                                                ).fromNow()}
                                            </Typography>
                                        </div>
                                    ))}
                                </div>
                                <div className="input w-full flex gap-2 items-center px-3 pt-3">
                                    <div className="flex-grow">
                                        <TextField
                                            fullWidth
                                            value={msgText}
                                            onChange={(e) =>
                                                setMsgText(e.target.value)
                                            }
                                            size="small"
                                            multiline
                                            placeholder="Say Hello..."
                                            id="fullWidth"
                                            maxRows={5}
                                        />
                                    </div>
                                    <div>
                                        <IconButton
                                            sx={{ aspectRatio: 1 }}
                                            onClick={handleSendBtnClick}
                                        >
                                            <Icon icon="ic:baseline-send" />
                                        </IconButton>
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default memo(ChatBox);
