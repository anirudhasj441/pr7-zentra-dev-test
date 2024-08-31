import { Typography, Paper } from "@mui/material";
import React from "react";
import { memo } from "react";

const IndexPage: React.FC = () => {
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
