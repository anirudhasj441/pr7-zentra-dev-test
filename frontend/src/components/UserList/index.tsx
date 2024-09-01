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
        user.getAllUsers().then((users) => {
            // users = users.map(async (u: IUserData) => {
            //     u.request_sent = await user.checkRequestSent(u.username);
            //     return u;
            // });
            setUsers(users);
        });
        return () => {
            mounted.current = true;
        };
    }, [user]);

    // const checkRequestSent = async (username: string) => {
    //     const url = "http://127.0.0.1:8000/check_request_sent";

    //     const data = {
    //         username: username,
    //     };

    //     try {
    //         const res = await fetch(url, {
    //             method: "POST",
    //             body: JSON.stringify(data),
    //             headers: {
    //                 "Content-Type": "Application/json",
    //                 Autherization: Authorization: "Bearer " + this._access_token,
    //             },
    //         });

    //         if (!res.ok) throw new Error("Somethin went wrong.");

    //         const response = await res.json();

    //         return response.request_sent;
    //     } catch (error) {
    //         console.error(error);
    //         return false;
    //     }
    // };

    return (
        <>
            <List>
                {users.map((u: IUserData) => (
                    <ListItem key={u.username}>
                        <ListItemIcon>
                            <Icon icon="mdi:user" fontSize={"2rem"} />
                        </ListItemIcon>
                        <ListItemText>
                            {u.first_name} {u.last_name}
                        </ListItemText>
                        <IconButton
                            onClick={() => handleSendRequestBtn(u.username)}
                        >
                            <Icon icon="mdi:user-add" />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </>
    );
};

export default UserList;
