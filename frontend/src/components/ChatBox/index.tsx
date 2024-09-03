import { Icon } from "@iconify/react/dist/iconify.js";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import React, { memo, useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import userContext from "../../User/context";
import { IMessageData } from "../../User/types";
import mainSocket from "../../socket";

import "./style.scss";
import moment from "moment";

const ChatBox: React.FC = () => {
    const mounted = useRef(false);

    const { chat_id } = useParams();

    const user = useContext(userContext);

    const messageContainer = useRef<HTMLDivElement | null>(null);

    const [messages, setMessages] = useState<IMessageData[]>([]);
    const [msgText, setMsgText] = useState<string>("");

    const handleSendBtnClick = () => {
        if (msgText.trim() === "") return;
        mainSocket.emit("message:send", {
            sender: user.username,
            chat_id: chat_id,
            message: msgText,
        });

        setMsgText("");
    };

    const handleNewMessage = (message: IMessageData) => {
        setMessages((messages) => [...messages, message]);
    };

    useEffect(() => {
        if (messageContainer.current === null) return;
        messageContainer.current.scrollTop =
            messageContainer.current.scrollHeight;
    }, [messageContainer]);

    useEffect(() => {
        console.log("ChatBox mounted!!!!");
        if (mounted.current) {
            setMessages([]);
            if (chat_id) user.getMessages(chat_id).then(setMessages);
            mainSocket.emit("connect:chat", {
                chat_id: chat_id,
            });

            return;
        }

        if (!mainSocket.connected) mainSocket.connect();

        setMessages([]);
        if (chat_id) user.getMessages(chat_id).then(setMessages);
        mainSocket.emit("connect:chat", {
            chat_id: chat_id,
        });

        mainSocket.on("message:notification", (data: { msg: string }) => {
            console.log(data);
        });

        mainSocket.on("message:recieve", (data: IMessageData) => {
            console.log("New Message", data);
            handleNewMessage(data);
        });

        return () => {
            mounted.current = true;
            if (mainSocket.connected) mainSocket.disconnect();
        };
    }, [user, chat_id]);

    return (
        <>
            <div className="h-full w-full flex flex-col py-3">
                <div
                    ref={messageContainer}
                    className="messages flex-grow w-full overflow-y-auto px-3"
                >
                    {messages.map((message: IMessageData) => (
                        <div
                            key={message.id}
                            className={[
                                "chat w-full",
                                message.sender.username === user.username
                                    ? "text-right"
                                    : "",
                            ].join(" ")}
                        >
                            <Box
                                sx={{
                                    bgcolor:
                                        message.sender.username ===
                                        user.username
                                            ? "primary.main"
                                            : "#4a4b4b",
                                    width: "fit-content",
                                    paddingX: "0.5rem",
                                    paddingY: "0.3rem",
                                    borderRadius: "1rem",
                                    marginLeft:
                                        message.sender.username ===
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
                                {moment(message.created_at).fromNow()}
                            </Typography>
                        </div>
                    ))}
                </div>
                <div className="input w-full flex gap-2 items-center px-3 pt-3">
                    <div className="flex-grow">
                        <TextField
                            fullWidth
                            value={msgText}
                            onChange={(e) => setMsgText(e.target.value)}
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
            </div>
        </>
    );
};

export default memo(ChatBox);
