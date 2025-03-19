import React from "react";
import Feed from "./Feed";
import RightSideBar from "./RightSideBar";
import { Box } from "@mui/material";

const Home = () => {
    return (
        <Box sx={{ display: "flex", flexGrow: 1, p: 2, gap: 2 }}>
            {/* Feed Section (Posts) */}
            <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
                <Feed />
            </Box>

            {/* Right Sidebar */}
            <Box sx={{ width: "280px" }}>
                <RightSideBar />
            </Box>
        </Box>
    );
};

export default Home;
