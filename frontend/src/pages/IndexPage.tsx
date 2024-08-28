import React from "react";
import { memo } from "react";

const IndexPage: React.FC = () => {
    return (
        <>
            <div className="h-full pt-2">
                <h1 className="text-center text-2xl font-bold">Index page</h1>
            </div>
        </>
    );
};

export default memo(IndexPage);
