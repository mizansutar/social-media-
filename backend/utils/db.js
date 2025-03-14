import mongoose from "mongoose";
//" connection the mongodb with the server for the data saving "

const mongouri="mongodb://127.0.0.1:27017/onas"

const connectDB=async () => {
    try {
       await mongoose.connect(process.env.mongouri || mongouri);
        console.log("mongoDB connected successfully....!")
    } catch (error) {
        console.log("error to connect with mongoDB");
    }
}
export default connectDB;