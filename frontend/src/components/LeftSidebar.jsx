import React, { useState } from "react";
import {
    Home,
    Search,
    Whatshot,
    Message,
    PlayCircleFilled,
    Notifications,
    AddBox,
    ExitToApp,
} from "@mui/icons-material";
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography, Divider, Avatar } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "../redux/authslice";
import CreatePost from "./createPost";
const LeftSidebar = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth); // Corrected selector
    const dispatch=useDispatch();
    const defaultProfilePic = "https://via.placeholder.com/50"; // Default avatar image
    const [open,setOpen]=useState(false);



    // Logout Handler
    const LogoutHandler = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/v1/user/logout", {           
                withCredentials: true,
            });

            if (response.data.success) {
                toast.success(response.data.message || "Logout successfully", { autoClose: 1000 });
                setTimeout(() => {
                    dispatch(setAuthUser(null))
                    navigate("/login");
                }, 1000);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed", { autoClose: 2000 });
        }
    };

    // Sidebar items
    const sidebarItems = [
        { icon: <Home />, text: "Home", path: "/" },
        { icon: <Search />, text: "Search", path: "/search" },
        { icon: <Whatshot />, text: "Trending", path: "/trending" },
        { icon: <Message />, text: "Messages", path: "/messages" },
        { icon: <PlayCircleFilled />, text: "Reels", path: "/reels" },
        { icon: <Notifications />, text: "Notifications", path: "/notifications" },
        { icon: <AddBox />, text: "Create", path: "/create" },
        { 
            icon: <Avatar src={user?.profilePic || defaultProfilePic} />, 
            text: user?.username || "Profile", 
            path: "/profile" 
        }, // Fix: Avatar for profile picture
        { icon: <ExitToApp />, text: "Logout", path: "/logout" },
    ];
const createPostHandler=()=>{
    setOpen(true);
}
    // Click Handler for Sidebar
    const sidebarHandler = (item) => {
        if (item.text === "Logout") {
            LogoutHandler();
        } 
        if (item.text === "Create") {
         createPostHandler();   
        }
    };

    return (<>
        <Box sx={{ width: "16%", bgcolor: "background.paper", height: "100vh", p: 2, boxShadow: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}>
                ONAS
            </Typography>

            <Divider />

            <List>
                {sidebarItems.map((item, index) => (
                    <ListItem
                        key={index}
                        button
                        onClick={() => sidebarHandler(item)}
                        sx={{
                            borderRadius: 1,
                            "&:hover": { bgcolor: "#f5f5f5" },
                            cursor: "pointer",
                        }}
                    >
                        <ListItemIcon sx={{ color: "#333" }}>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} sx={{ color: "#333" }} />
                    </ListItem>
                ))}
            </List>
        </Box>
        <CreatePost open ={open} setOpen={setOpen}/></>
    );
};

export default LeftSidebar;
