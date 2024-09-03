import { Icon } from "@iconify/react/dist/iconify.js";
import {Box, IconButton, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import userContext from "../../User/context";
import { IMessageData } from "../../User/types";
import mainSocket from "../../socket";

const ChatBox: React.FC = () => {
    const mounted = useRef(false);

    const {chat_id} = useParams();

    const user = useContext(userContext);

    const [messages, setMessages] = useState<IMessageData[]>([]);
    const [msgText, setMsgText] = useState<string>("")

    const handleSendBtnClick = () => {
        mainSocket.emit("message:send", {
            sender: user.username,
            chat_id: chat_id,
            message: msgText
        })
    }

    const handleNewMessage = (message: IMessageData) => {

        setMessages(messages => [...messages, message])
    }

    useEffect(() => {
        mainSocket.connect();
        if(mounted.current) return;;
        if(chat_id)
        user.getMessages(chat_id).then(setMessages);
        mainSocket.emit("connect:chat", {
            chat_id: chat_id
        })

        mainSocket.on("message:notification", (data: {msg: string}) => {
            console.log(data)
        })

        mainSocket.on("message:recieve", (data: IMessageData) => {
            console.log("New Message", data);
            handleNewMessage(data)
        })

        return () => {
            mounted.current = true;
            mainSocket.disconnect()
        }
    }, [user, chat_id])

    return <>
        <div className="h-full w-full flex flex-col p-3">
            <div className="messages flex-grow w-full overflow-y-auto">
                {messages.map((message: IMessageData) => (
                    <div key={message.id} className={["chat w-full", message.sender.username === user.username ? "text-right" : ""].join(" ")}>
                        <Box sx={{
                            bgcolor:  message.sender.username === user.username ? 'primary.main' : '#4a4b4b' ,
                            width: 'fit-content',
                            paddingX: '0.5rem',
                            paddingY: '0.3rem',
                            borderRadius: '1rem',
                            marginLeft: message.sender.username === user.username ? "auto" : ""
                        }}>
                            <Typography align="right">{message.text}</Typography>
                        </Box>
                        <Typography variant="caption" >Just now</Typography>
                    </div>
                ))}
            </div>
            <div className="input w-full flex gap-2 items-center">
                <div className="flex-grow">
                <TextField fullWidth value={msgText} onChange={(e) => setMsgText(e.target.value)} size="small" multiline placeholder="Say Hello..." id="fullWidth"  maxRows={5} />
                </div>
                <div>
                <IconButton sx={{aspectRatio: 1}} onClick={handleSendBtnClick}>
                    <Icon icon="ic:baseline-send" />
                </IconButton>
                </div>
            </div>
        </div>
    </>
}

export default ChatBox