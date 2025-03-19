import profileImage from "../models/profileImage_model.js";

const Url = "http://localhost:8000";

const uploadImageDb = async (profilePic) => {
  try {
    if (!profilePic) return null;

    const img = {
      filename: profilePic.originalname,
      contentType: profilePic.mimetype,
      imageBase64: profilePic.buffer.toString("base64"),
    };

    const newImage = new profileImage(img);
    await newImage.save();

    const imageUrl = `${Url}/api/v1/image/images/profile/${newImage._id}`;
    return imageUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export default uploadImageDb;

