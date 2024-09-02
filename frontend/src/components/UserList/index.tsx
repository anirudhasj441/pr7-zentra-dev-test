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

const UserList: React.FC = () => {
    const mounted = useRef(false);

    const [users, setUsers] = useState([]);

    const user = useContext(userContext);

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
                    <ListItem >
                        <ListItemIcon>
                            <Icon icon="mdi:user" fontSize={"2rem"} />
                        </ListItemIcon>
                        <ListItemText primary={u.first_name + " " + u.last_name} secondary={"@"+u.username}>
                        </ListItemText>

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
