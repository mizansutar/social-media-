import multer from "multer"

const storage = multer.memoryStorage(); // Stores file in memory (for example)
const upload = multer({ storage });

export default upload;
