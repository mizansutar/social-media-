import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  filename: String,
  contentType: String,
  imageBase64: String
});

const postImageModel = mongoose.model('postImages', imageSchema);
export default postImageModel;
