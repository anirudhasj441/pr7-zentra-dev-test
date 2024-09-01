import { Typography, Paper } from "@mui/material";
import React, { useContext, useEffect, useRef } from "react";
import { memo } from "react";
import userContext from "../User/context";
import { useNavigate } from "react-router-dom";

const IndexPage: React.FC = () => {
    const user = useContext(userContext);
    const mounted = useRef(false);

    const navigate = useNavigate();

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
                    <Typography variant="h4" align="center" className="py-5">
                        Chats
                    </Typography>
                    <div className="flex-grow"></div>
                    <div className="footer"></div>
                </Paper>
                <div className="flex-grow"></div>
            </div>
        </>
    );
};

export default memo(IndexPage);
