/**
 * @file RequestList/index.tsx
 *
 * @brief Component for displaying a list of user requests.
 *
 * @component
 * The `RequestList` component displays a list of user requests with options to accept or reject each request.
 *
 * @example
 * <RequestList />
 *
 * @author Anirudha Jadhav <anirudhasj441@gmail.com>
 */

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

/**
 * @function RequestList
 * @brief Component for displaying and managing user requests.
 * @details This component fetches and displays a list of user requests. Users can accept or reject requests,
 *          which updates the request status and refreshes the list.
 * @returns {JSX.Element} The rendered request list component.
 */
const RequestList: React.FC = () => {
    const mounted = useRef(false);
    const [requests, setRequests] = useState<IRequestData[]>([]);

    const user = useContext(userContext);

    /**
     * @function handleRequestStatusUpdate
     * @brief Updates the status of a request and refreshes the request list.
     * @param {number} requestId - The ID of the request to update.
     * @param {string} status - The new status to set for the request ("accept" or "reject").
     * @returns {Promise<void>} A promise that resolves when the request status is updated and the list is refreshed.
     */
    const handleRequestStatusUpdate = async (requestId: number, status: string) => {
        await user.updateRequestStatus(requestId, status);
        const requests = await user.getRequests();
        setRequests(requests);
    };

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
                        <IconButton onClick={() => handleRequestStatusUpdate(intrest_request.id, "accept")}>
                            <Icon icon="mdi:user-check" />
                        </IconButton>
                        <IconButton onClick={() => handleRequestStatusUpdate(intrest_request.id, "reject")}>
                            <Icon icon="mdi:user-remove" />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </>
    );
};

export default RequestList;
