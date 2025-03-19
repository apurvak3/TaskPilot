import mongoose from "mongoose"
import dotenv from "dotenv";
dotenv.config();


export const connectDB = mongoose.connect(process.env.MONGO_URI , {dbName : "tasks"}).then(() =>{
    console.log("DataBase connected").catch((e) =>{
        console.log(e);
    })
})