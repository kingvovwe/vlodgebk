import { MONGO_URI } from "./env.config.js";
import mongoose from "mongoose";

export const connDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("DB connected");

    } catch (e) {
        console.log(`Failed to connect to DB: ${e.message}`);
        process.exit(1);
    }
}




