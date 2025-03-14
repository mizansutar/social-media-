// libraries 
import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv";
import connectDB from "./utils/db.js"

// routes 
import userRoute  from "./routes/user_routes.js"

dotenv.config();

const app=express();
const PORT=process.env.PORT || 8000;


//middleware
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({extended:true}));
const corsOptions={
    origin:'http://localhost:5173',
    Credential:true
};

app.use(cors(corsOptions))
// api 
app.use("/api/v1/user",userRoute);

app.listen(PORT,()=>{
    connectDB();
    console.log(`server is sunning on port ${PORT}`)
})