import React from "react";
import Posts from "./Posts";
import { Box } from "@mui/material";

const Feed = () => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, width: "100%" }}>
            <Posts />
        </Box>
    );
};

export default Feed;
