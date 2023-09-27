import dotenv from "dotenv"
import express from "express";
import router from "./router.js";
import path from 'path'
import cors from "cors";
let dotenvPath=path.resolve(("..\\.env"))
dotenv.config({path: dotenvPath});
import mongoose from "mongoose";
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(3000, (req,res)=>{
        console.log("Express Server is running on port 3000");
    });
}
const app=express();
app.use(cors());
app.use(express.json());
app.use(router);

