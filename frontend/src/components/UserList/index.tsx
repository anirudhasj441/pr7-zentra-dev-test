/**
 * @file UserList/index.tsx
 *
 * @brief Component for displaying a list of users with an option to send interest requests.
 *
 * @component
 * The `UserList` component displays a list of users and allows the current user to send interest
 * requests to other users. It fetches the user list from context and updates it when a new request
 * is sent.
 *
 * @example
 * <UserList />
 *
 * @author Anirudha Jadhav <anirudhasj441@gmail.com>
 */

import { Icon } from "@iconify/react/dist/iconify.js";
import {
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { IUserData } from "../../User/types";
import userContext from "../../User/context";

/**
 * @function UserList
 * @brief Component for displaying a list of users and sending interest requests.
 * @details This component fetches and displays a list of users from the context.
 *          It allows the current user to send interest requests to selected users and
 *          updates the user list accordingly.
 * @returns {JSX.Element} The rendered user list component.
 */
const UserList: React.FC = () => {
    const mounted = useRef(false);

    const [users, setUsers] = useState<IUserData[]>([]);

    const user = useContext(userContext);

    /**
     * @function handleSendRequestBtn
     * @brief Sends an interest request to the specified user and updates the user list.
     * @param {string} username - The username of the user to whom the interest request is sent.
     * @returns {Promise<void>} A promise that resolves when the request is sent and the user list is updated.
     */
    const handleSendRequestBtn = async (username: string) => {
        await user.sendRequest(username);
        const users = await user.getAllUsers();
        setUsers(users);
    };

    useEffect(() => {
        if (mounted.current) return;
        user.getAllUsers().then(setUsers);
        return () => {
            mounted.current = true;
        };
    }, [user]);

    return (
        <>
            <List>
                {users.map((u: IUserData) => (
                    <React.Fragment key={u.username}>
                        <ListItem>
                            <ListItemIcon>
                                <Icon icon="mdi:user" fontSize={"2rem"} />
                            </ListItemIcon>
                            <ListItemText
                                primary={u.first_name + " " + u.last_name}
                                secondary={"@" + u.username}
                            />
                            <IconButton
                                onClick={() => handleSendRequestBtn(u.username)}
                            >
                                <Icon icon="mdi:user-add" />
                            </IconButton>
                        </ListItem>
                    </React.Fragment>
                ))}
            </List>
        </>
    );
};

export default UserList;
