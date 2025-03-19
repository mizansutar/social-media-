import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
    Box,
    Typography
} from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";

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

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image || !description) {
            toast.error("Please upload an image and enter a description.");
            return;
        }

        const formData = new FormData();
        formData.append("image", image);
        formData.append("description", description);

        try {
            const response = await axios.post("http://localhost:8000/api/v1/post/create", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });

            if (response.data.success) {
                toast.success("Post created successfully!");
                setOpen(false);
                setImage(null);
                setPreview(null);
                setDescription("");
            }
        } catch (error) {
            toast.error("Failed to create post. Try again.");
        }
    };

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Create Post</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    {/* Image Preview */}
                    {preview && (
                        <Box display="flex" justifyContent="center" mb={2}>
                            <img src={preview} alt="Preview" style={{ width: "100%", maxHeight: 250, borderRadius: 10 }} />
                        </Box>
                    )}

                    {/* Image Upload Input */}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ marginBottom: "10px", display: "block" }}
                    />

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
                    />

                    {/* Submit Button */}
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
