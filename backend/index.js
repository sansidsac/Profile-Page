import express from "express";
import mongoose from "mongoose";
import { MONGODBURL, PORT} from "./config.js";
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

app.get('/',async(request,response)=>{
    console.log(request);
    return response.status(234).send('Welcome to Profile Page')
})


mongoose.connect(MONGODBURL).then(() => {
    console.log("App Connected to MongoDB successfully");
    app.listen(PORT, () => {
        console.log(`App is listening to port ${PORT}`);
    });
}).catch((error) => {
    console.log(error);
})