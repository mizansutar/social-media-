import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  filename: String,
  contentType: String,
  imageBase64: String
});

const profileImage = mongoose.model('profileImages', imageSchema);
export default profileImage;
