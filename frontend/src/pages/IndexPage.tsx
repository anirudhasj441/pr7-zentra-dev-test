import { Typography, Paper, Tab } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { memo } from "react";
import userContext from "../User/context";
import { useNavigate } from "react-router-dom";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { TabContext } from "@mui/lab";
import { Icon } from "@iconify/react";
import UserList from "../components/UserList";
import RequstList from "../components/RequestList";

const IndexPage: React.FC = () => {
    const user = useContext(userContext);
    const mounted = useRef(false);

    const navigate = useNavigate();

    const [currentTab, setCurrentTab] = useState<string>("chats");

    const handleTabChange = (event: React.SyntheticEvent, value: string) => {
        event.preventDefault();
        setCurrentTab(value);
    };

    useEffect(() => {
        if (mounted.current) return;
        user.checkUserAuthenticated().then((result) => {
            console.log(result);
            if (!result) {
                navigate("/login");
            }
        });

        return () => {
            mounted.current = true;
        };
    }, [user, navigate]);

    return (
        <>
            <div className="h-full w-full flex">
                <Paper
                    elevation={3}
                    square
                    className=" w-[350px] max-w-full h-full flex flex-col"
                >
                    <TabContext value={currentTab}>
                        <div className="flex-grow">
                            <TabPanel
                                value={"chats"}
                                sx={{ padding: "0.8rem" }}
                            >
                                <Typography
                                    variant="h4"
                                    align="left"
                                    // className="pb-1"
                                >
                                    Chats
                                </Typography>
                            </TabPanel>
                            <TabPanel
                                value={"add_new"}
                                sx={{ padding: "0.8rem", height: "100%" }}
                                className="flex-col"
                            >
                                <Typography
                                    variant="h4"
                                    align="left"
                                    // className="pb-1"
                                >
                                    Add New
                                </Typography>
                                <UserList />
                            </TabPanel>
                            <TabPanel
                                value={"requests"}
                                sx={{ padding: "0.8rem" }}
                            >
                                <Typography
                                    variant="h4"
                                    align="left"
                                    // className="pb-1"
                                >
                                    Request
                                </Typography>
                                <RequstList />
                            </TabPanel>
                        </div>
                        <div className="footer w-full">
                            <TabList
                                onChange={handleTabChange}
                                className="w-full"
                                centered
                            >
                                <Tab
                                    value={"chats"}
                                    icon={
                                        <Icon
                                            icon="ic:baseline-chat-bubble"
                                            fontSize={"1.5rem"}
                                        />
                                    }
                                />
                                <Tab
                                    value={"add_new"}
                                    icon={
                                        <Icon
                                            icon="mingcute:user-add-fill"
                                            fontSize={"1.5rem"}
                                        />
                                    }
                                />
                                <Tab
                                    value={"requests"}
                                    icon={
                                        <Icon
                                            icon="ic:round-notifications"
                                            fontSize={"1.5rem"}
                                        />
                                    }
                                />
                            </TabList>
                        </div>
                    </TabContext>
                </Paper>
                <div className="flex-grow flex flex-col">

                </div>
            </div>
        </>
    );
};

export default memo(IndexPage);
