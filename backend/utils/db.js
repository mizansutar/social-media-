import mongoose from "mongoose";
const connectDB=async () => {
    try {
       await mongoose.connect(process.env.mongoURL);
        console.log("mongoDB connected successfully....!")
    } catch (error) {
        console.log("error to connect with mongoDB");
    }
}
export default connectDB;