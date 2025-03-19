import React from "react";
import { Box, Typography } from "@mui/material";

import Post from "./post";
const Posts = () => {

//bgcolor: "#f5f5f5", p: 2, borderRadius: 2, boxShadow: 1 
//  <Typography variant="h5">Post Content</Typography>
    return (
        <Box sx={{ width: "60%", }}>
        {  [1,2,3,4].map((item,index)=> <Post key={index}/>)}
        </Box>
    );
};

export default Posts;
