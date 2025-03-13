// libraries 
import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"


const app=express();
const PORT=8000;

// testing the index page or server is correct working or not to setup


app.get("/",(_,res)=>{
    return res.status(200).json({
        message:"the testing backend setup to start project ",
        success:true
    })
})









//middleware
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({extended:true}));
const corsOptions={
    origin:'http://localhost:5173',
    Credential:true
};

app.use(cors(corsOptions))



app.listen(PORT,()=>{console.log(`server is sunning on port ${PORT}`)})