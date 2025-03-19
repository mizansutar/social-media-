
import profileImage from "../models/profileImage_model.js";


const getImage = async (req, res) => {
    try {
      const image = await profileImage.findById(req.params.id);
      if (!image) {
        return res.status(404).json({ message: 'Image not found' });
      }
      res.set('Content-Type', image.contentType);
      res.send(Buffer.from(image.imageBase64, 'base64'));
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  export default getImage;