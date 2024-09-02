import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
} from "@mui/material";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useContext, useEffect, useRef, useState } from "react";
import userContext from "../../User/context";
import { IRequestData } from "../../User/types";


const RequstList: React.FC = () => {
    const mounted = useRef(false);
    const [requests, setRequests] = useState<IRequestData[]>([]);

    const user = useContext(userContext);

    const handleRequestStautsUpdate = async (requestId: number, status: string) => {
        await user.updateRequestStatus(requestId, status);
        const requests = await user.getRequests();
        setRequests(requests);
    }

    useEffect(() => {
        if (mounted.current) return;

        user.getRequests().then(setRequests);

        return () => {
            mounted.current = true;
        };
    }, [user]);

    return (
        <>
            <List>
                {requests.map((intrest_request) => (
                    <ListItem key={intrest_request.id}>
                        <ListItemIcon>
                            <Icon icon="mdi:user" fontSize={"2rem"} />
                        </ListItemIcon>
                        <ListItemText>
                            {intrest_request.request_from.first_name} {intrest_request.request_from.last_name}
                        </ListItemText>
                        <IconButton onClick={() => handleRequestStautsUpdate(intrest_request.id, "accept")}>
                            <Icon icon="mdi:user-check" />
                        </IconButton>
                        <IconButton onClick={() => handleRequestStautsUpdate(intrest_request.id, "reject")}>
                            <Icon icon="mdi:user-remove" />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </>
    );
};

export default RequstList;
