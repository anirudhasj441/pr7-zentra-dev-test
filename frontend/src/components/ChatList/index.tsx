/**
 * @file ChatList/index.tsx
 *
 * @brief Component for displaying a list of chats.
 *
 * @component
 * The `ChatList` component displays a list of chat items. Each item represents a chat session
 * and allows the user to navigate to the chat's detail view.
 *
 * @example
 * <ChatList />
 *
 * @author Anirudha Jadhav <anirudhasj441@gmail.com>
 */

import { Icon } from "@iconify/react/dist/iconify.js";
import {
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import userContext from "../../User/context";
import { IChatData } from "../../User/types";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * @function ChatList
 * @brief Component for displaying a list of chats.
 * @details This component fetches and displays a list of chat items. Each item in the list represents
 *          a chat session and includes navigation to the chat's detail view upon selection.
 * @returns {JSX.Element} The rendered chat list component.
 */
const ChatList: React.FC = () => {
    const mounted = useRef(false);

    const navigate = useNavigate();

    const location = useLocation();

    const user = useContext(userContext);

    const [chats, setChats] = useState<IChatData[]>([]);

    useEffect(() => {
        if (mounted.current) return;

        user.getChats().then(setChats);

        return () => {
            mounted.current = true;
        };
    }, [user]);

    return (
        <>
            <List>
                {chats.map((chat: IChatData) => (
                    <ListItemButton
                        key={chat.short_id}
                        onClick={() => navigate("/chat/" + chat.short_id)}
                        selected={
                            location.pathname === "/chat/" + chat.short_id
                        }
                    >
                        <ListItemIcon>
                            <Icon icon="mdi:user" fontSize={"2rem"} />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                chat.initiator.username !== user.username
                                    ? `${chat.initiator.first_name} ${chat.initiator.last_name}`
                                    : `${chat.acceptor.first_name} ${chat.acceptor.last_name}`
                            }
                        />
                    </ListItemButton>
                ))}
            </List>
        </>
    );
};

export default ChatList;
