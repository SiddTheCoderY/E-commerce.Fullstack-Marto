import { verifyToken } from "../config/jwt.js";

export const socketAuth = (socket, next) => {
  const token = socket.handshake.auth?.token;
  const decoded = verifyToken(token, process.env.ACCESS_TOKEN_SECRET);
  if (!decoded) {
    return next(new Error("Unauthorized from socketAuth"));
  }
  socket.user = decoded;
  next();
};
