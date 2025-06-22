import connectDB from "../shared/db/index.js";
import app from "./app.js";
import dotenv from "dotenv";


// load environment variables
dotenv.config({
    path: "./.env"
})

// check environment
if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in the environment variables");
}


// connect to database
await connectDB();


// start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`✅ Rest Server running on http://localhost:${PORT}`);
})




