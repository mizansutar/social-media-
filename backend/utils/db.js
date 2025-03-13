import mongoose from "mongoose";

//" connection the mongodb with the server for the data saving "

const connectDB=async () => {
    try {
       await mongoose.connect(process.env.mongoURL);
        console.log("mongoDB connected successfully....!")
    } catch (error) {
        console.log("error to connect with mongoDB");
    }
}
export default connectDB;