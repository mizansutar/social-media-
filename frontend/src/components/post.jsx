import React, { useState } from "react";
import { 
    Avatar, Box, Card, CardContent, CardHeader, CardMedia, 
    IconButton, Typography, TextField, Button 
} from "@mui/material";
import { 
    FavoriteBorder, ChatBubbleOutline, Send, MoreHoriz, BookmarkBorder 
} from "@mui/icons-material";
import CommentDialog from "./CommentDialog"; // Importing the separate dialog

const Post = () => {
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState(["Nice post!", "Great content!"]);

    // Post details
    const postImage = "https://via.placeholder.com/400";
    const postUsername = "Username";

    // Open & Close Comment Dialog
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Handle comment submission
    const handleCommentSubmit = () => {
        if (comment.trim() !== "") {
            setComments([...comments, comment]);
            setComment("");
        }
    };

    return (
        <>
            <Card sx={{ maxWidth: 500, margin: "auto", my: 2, boxShadow: 3, borderRadius: 2 }}>
                {/* Header: Avatar + Username + More Options */}
                <CardHeader
                    avatar={<Avatar src="https://via.placeholder.com/50" alt="User" />}
                    action={<IconButton><MoreHoriz /></IconButton>}
                    title={postUsername}
                    subheader="2 hours ago"
                />

                {/* Post Image */}
                <CardMedia
                    component="img"
                    height="400"
                    image={postImage}
                    alt="Post Image"
                />

                {/* Icons Section */}
                <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box>
                        <IconButton><FavoriteBorder /></IconButton>
                        <IconButton onClick={handleOpen}><ChatBubbleOutline /></IconButton>
                        <IconButton><Send /></IconButton>
                    </Box>
                    <IconButton><BookmarkBorder /></IconButton> {/* Save icon */}
                </CardContent>

                {/* Post Caption */}
                <CardContent>
                    <Typography variant="body1">
                        <strong>{postUsername}</strong> This is a sample Instagram-style post caption.
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ cursor: "pointer" }} onClick={handleOpen}>
                        View all {comments.length} comments
                    </Typography>
                </CardContent>

                {/* Comment Input Box */}
                <CardContent sx={{ display: "flex", alignItems: "center" }}>
                    <TextField
                        fullWidth
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        label="Write a comment..."
                        variant="outlined"
                        size="small"
                    />
                    {comment.trim() && (
                        <Button 
                            sx={{ ml: 1 }} 
                            variant="contained" 
                            color="primary" 
                            onClick={handleCommentSubmit}
                        >
                            Post
                        </Button>
                    )}
                </CardContent>
            </Card>

            {/* Comment Dialog Component */}
            <CommentDialog open={open} handleClose={handleClose} postImage={postImage} postUsername={postUsername} comments={comments} />
        </>
    );
};

export default Post;
