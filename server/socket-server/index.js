import http from "http";
import { Server } from "socket.io";
import connectDB from "../shared/db/index.js";
import { setupSocket } from "./handlers/userConnection.js";
import dotenv from "dotenv";


dotenv.config({ path: "./.env" }); 

await connectDB(); 

const PORT = process.env.SOCKET_PORT || 8000;

const httpServer = http.createServer(); // No Express needed unless you plan to share the API server

const io = new Server(httpServer, {
    cors: {
        origin: process.env.CORS_ORIGIN,
        methods: ["GET", "POST"]
    }
});

setupSocket(io); // Bind socket logic

httpServer.listen(PORT, () => {
    console.log(`🚀 Socket.IO server running on http://localhost:${PORT}`);
});
