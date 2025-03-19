import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
    Box
} from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import "./CreatePost.css"; // Import CSS file for styling

const CreatePost = ({ open, setOpen }) => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [description, setDescription] = useState("");

    // Handle Image Upload
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file)); // Preview Image
        }
    };

    // Clear Image Selection
    const handleClearImage = () => {
        setImage(null);
        setPreview(null);
    };

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image || !description) {
            toast.error(" Please upload an image and enter a description.");
            return;
        }

        const formData = new FormData();
        formData.append("image", image);
        formData.append("description", description);

        try {
            const response = await axios.post("http://localhost:8000/api/v1/post/addpost", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });

            if (response.data.success) {
                // Show success toast
                toast.success(" Post created successfully!");

                // Wait for 3 seconds before closing modal
                setTimeout(() => {
                    setOpen(false);
                    handleClearImage(); // Clear image after successful post
                    setDescription("");
                }, 3000); // Delay closing modal
            }
        } catch (error) {
            toast.error(" Failed to create post. Try again.");
        }
    };

    return (
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md" sx={{ "& .MuiDialog-paper": { width: "600px" } }}>
            <DialogTitle>Create Post</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit} className="create-post-form">
                    {/* Image Preview */}
                    {preview && (
                        <Box className="image-preview">
                            <img src={preview} alt="Preview" />
                        </Box>
                    )}

                    {/* Custom Styled File Input */}
                    <div className="file-upload">
                        <label htmlFor="file-input">Choose an Image</label>
                        <input id="file-input" type="file" accept="image/*" onChange={handleImageChange} />
                        {preview && (
                            <Button className="clear-btn" onClick={handleClearImage} variant="outlined" color="secondary">
                                Clear
                            </Button>
                        )}
                    </div>

                    {/* Description Input */}
                    <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="description-input"
                    />

                    {/* Submit & Cancel Buttons */}
                    <Box mt={2} display="flex" justifyContent="space-between">
                        <Button onClick={() => setOpen(false)} variant="outlined">
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            Post
                        </Button>
                    </Box>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreatePost;
