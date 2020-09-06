const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const botName = "CatChat Bot";
//Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

//Run When Client Connects
io.on("connection", (socket) => {
  //Welcoming user
  socket.emit("message", formatMessage(botName, "Welcome to CatChat"));

  //// BroadCasting when a user connects
  socket.broadcast.emit(
    "message",
    formatMessage(botName, "A User joined the chat")
  );

  //Runs when client disconnect
  socket.on("disconnect", () => {
    io.emit("message", formatMessage(botName, "A user has left the chat"));
  });

  socket.on("chatmessage", (msg) => {
    io.emit("message", formatMessage("User", msg));
  });
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => console.log(`Server Running on Port : ${PORT}`));
