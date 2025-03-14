import postImageModel from "../models/postImage_model.js";

const Url = "http://localhost:8000";

const uploadImageDb = async (image) => {
  try {
    if (!image) return null;

    const img = {
      filename: image.originalname,
      contentType: image.mimetype,
      imageBase64: image.buffer.toString("base64"),
    };
    
    const newImage = new postImageModel(img);
    await newImage.save();

    const imageUrl = `${Url}/file/${newImage._id}`;
    return imageUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export default uploadImageDb;


const getImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.set('Content-Type', image.contentType);
    res.send(Buffer.from(image.imageBase64, 'base64'));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
