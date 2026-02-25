import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import connectDB from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";

// Create Express app and HTTP server
const app = express();
const server = http.createServer(app);

// Initialize Socket.io server
export const io = new Server(server, {
  cors: { origin: "*" },
});

// Store online users
export const userSocketMap = {}; //{ userId: [socketId1, socketId2] }

// socket.io connection handler
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("User Connected", userId);
  if (!userId || typeof userId !== "string") return;

  //  Initialize array if first connection
  if (!userSocketMap[userId]) {
    userSocketMap[userId] = [];
  }

  //  Store socketId (multi-device support)
  if (!userSocketMap[userId].includes(socket.id)) {
    userSocketMap[userId].push(socket.id);
  }

  //  Broadcast online users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  //  Disconnect handler
  socket.on("disconnect", () => {
    console.log("User disconnected:", userId, socket.id);
    if (!userSocketMap[userId]) return;

    // Remove only this socketId
    userSocketMap[userId] = userSocketMap[userId].filter(
      (id) => id !== socket.id,
    );

    // If no active sockets → user offline
    if (userSocketMap[userId].length === 0) {
      delete userSocketMap[userId];
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// Middleware setup
app.use(express.json({ limit: "4mb" }));
app.use(cors());

// Route Setup
app.use("/api/status", (req, res) => res.send("Server is live"));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

// Connect to MongoDB
await connectDB();

if (process.env.NODE_ENV != "production") {
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => console.log("Server is Running on PORT: " + PORT));
}

// Export Server for vercel
export default server;