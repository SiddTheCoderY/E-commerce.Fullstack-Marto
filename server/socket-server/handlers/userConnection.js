const connectedUsers = new Map(); // userId => socket.id

export const setupSocket = (io) => {
    io.on("connection", (socket) => {
        console.log("🔌 A user connected:", socket.id);

        // Optionally get userId from client
        socket.on("register", (userId) => {
            connectedUsers.set(userId, socket.id);
            console.log(`✅ User ${userId} registered with socket ${socket.id}`);
        });

        // Cleanup on disconnect
        socket.on("disconnect", () => {
            for (const [userId, sId] of connectedUsers.entries()) {
                if (sId === socket.id) {
                    connectedUsers.delete(userId);
                    console.log(`❌ User ${userId} disconnected`);
                    break;
                }
            }
        });
    });
};

export { connectedUsers };
