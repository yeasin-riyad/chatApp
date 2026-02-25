# 💬 Real-Time Chat Application (MERN + Socket.IO)

A full-stack real-time chat application built using the **MERN Stack** (MongoDB, Express, React, Node.js) with **Socket.IO** for instant messaging.

This app allows users to send and receive messages in real-time without reloading the page.

---

## 🚀 Features

- 🔐 User Authentication (Register & Login)
- 💬 Real-Time Messaging (Instant message delivery)
- 🟢 Online / Offline User Status
- 📩 Unseen Message Counter
- ✅ Message Seen Indicator
- 🖼️ Image Sending Support
- 📱 Multi-Device Login Support
- ⚡ Fast & Responsive UI
- 🧹 Proper Socket Cleanup Handling

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Axios
- Socket.IO Client
- CSS / Tailwind (if used)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- JWT Authentication

---

## 📡 Real-Time Communication

This application uses **Socket.IO** to enable real-time communication.

When a user sends a message:

1. Message is saved to MongoDB.
2. Server emits a `newMessage` event.
3. Receiver instantly receives the message.
4. No page reload required.

### 🔁 Real-Time Flow

