import React, { useState } from "react";
import {
    Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
    IconButton, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography, Divider
} from "@mui/material";
import { MoreHoriz, Close } from "@mui/icons-material";

const CommentDialog = ({ open, handleClose, postImage, postUsername, userBio, comments }) => {
    const [openMoreDialog, setOpenMoreDialog] = useState(false);
    const [comment, setComment] = useState("");
    const [allComments, setAllComments] = useState(comments);

    // Open & Close More Options Dialog
    const handleOpenMoreDialog = () => setOpenMoreDialog(true);
    const handleCloseMoreDialog = () => setOpenMoreDialog(false);

    // Handle comment submission
    const handleCommentSubmit = () => {
        if (comment.trim() !== "") {
            setAllComments([...allComments, comment]);
            setComment("");
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            {/* Main Dialog Content */}
            <DialogContent sx={{ display: "flex", height: "500px", p: 0 }}>

                {/* Left Side: Post Image */}
                <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "#f5f5f5" }}>
                    <img src={postImage} alt="Post" style={{ maxWidth: "100%", maxHeight: "100%" }} />
                </Box>

                {/* Right Side: Comments */}
                <Box sx={{ flex: 1.2, display: "flex", flexDirection: "column" }}>

                    {/* Header: Username + More Options */}
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Avatar src="https://via.placeholder.com/50" alt="User" sx={{ mr: 1 }} />
                            <Box>
                                <Typography variant="body1" fontWeight="bold">{postUsername}</Typography>
                                <Typography variant="body2" color="text.secondary">{userBio}</Typography>
                            </Box>
                        </Box>

                        {/* More (3-dots) Icon */}
                        <IconButton onClick={handleOpenMoreDialog}>
                            <MoreHoriz />
                        </IconButton>

                        {/* Small Dialog for More Options */}
                        <Dialog open={openMoreDialog} onClose={handleCloseMoreDialog}>
                            <DialogTitle>Options</DialogTitle>
                            <DialogContent>
                                <Typography onClick={handleCloseMoreDialog} sx={{ cursor: "pointer", p: 1 }}>unfollow</Typography>
                                <Typography onClick={handleCloseMoreDialog} sx={{ cursor: "pointer", p: 1 }}>add to fav</Typography>
                                <Typography onClick={handleCloseMoreDialog} sx={{ cursor: "pointer", p: 1, color: "red" }}>Report</Typography>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseMoreDialog} color="primary">Close</Button>
                            </DialogActions>
                        </Dialog>
                    </Box>

                    <Divider />

                    {/* Comments Section */}
                    <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
                        <List>
                            {allComments.map((cmt, index) => (
                                <ListItem key={index} alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar src="https://via.placeholder.com/50" alt="User" />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={<Typography fontWeight="bold">User {index + 1}</Typography>}
                                        secondary={cmt}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>

                    <Divider />

                    {/* Comment Input Box */}
                    <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
                        <TextField
                            fullWidth
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            label="Write a comment..."
                            variant="outlined"
                            size="small"
                        />
                        {comment.trim() && (
                            <Button onClick={handleCommentSubmit} sx={{ ml: 1 }}>Post</Button>
                        )}
                    </Box>
                </Box>
            </DialogContent>

            {/* Close Button */}
            <DialogActions>
                <Button onClick={handleClose} startIcon={<Close />} color="error">Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CommentDialog;
