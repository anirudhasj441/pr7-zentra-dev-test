import { Icon } from "@iconify/react/dist/iconify.js";
import { List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import userContext from "../../User/context";
import { IChatData } from "../../User/types";
import { useLocation, useNavigate } from "react-router-dom";

const ChatList: React.FC = () => {
    const mounted = useRef(false)

    const navigate = useNavigate()

    const location = useLocation()

    const user = useContext(userContext)

    const [chats, setChats] = useState<IChatData[]>([])



    useEffect(() => {
        if(mounted.current) return;

        user.getChats().then(setChats)

        return () => {
            mounted.current = true
        }

    }, [user])


    return <>
        <List>
            {chats.map((chat: IChatData) => (
                <ListItemButton key={chat.short_id} onClick={() => navigate('/chat/' + chat.short_id)} selected={location.pathname === '/chat/' + chat.short_id}>
                    <ListItemIcon>
                        <Icon icon="mdi:user" fontSize={"2rem"} />
                    </ListItemIcon>
                    <ListItemText primary={chat.initiator.username !== user.username ? chat.initiator.username : chat.acceptor.username} />
                </ListItemButton>
            ))}
        </List>
    </>
}

export default ChatList