import React from "react";
import { Outlet } from "react-router-dom";
import LeftSidebar from "./LeftSidebar";
import { Box } from "@mui/material";

const MainLayout = () => {
    return (
        <Box sx={{ display: "flex", height: "100vh" }}>
            {/* Left Sidebar */}
            <LeftSidebar />
            
            {/* Main Content (Feed + Right Sidebar) */}
            <Box sx={{ flexGrow: 1, overflowY: "auto", p: 2 }}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default MainLayout;
