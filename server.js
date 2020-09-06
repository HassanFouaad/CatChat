const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");
const {
  getUserById,
  userJoin,
  getRooms,
  userLeaveChat,
} = require("./utils/user");
const app = express();

const server = http.createServer(app);
const io = socketio(server);
const botName = "CatChat Bot";
//Set Static Folder

app.use(express.static(path.join(__dirname, "public")));

//Run When Client Connects
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    ///Create Room
    //JOIN ROOM
    socket.join(user.room);
    //Welcoming user
    socket.emit("message", formatMessage(botName, "Welcome to CatChat"));

    //// BroadCasting when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(botName, `${user.username} has joined the chat`)
      );
    //Users and Room Info
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRooms(user.room),
    });
  });

  //Chat Message
  socket.on("chatmessage", (msg) => {
    const user = getUserById(socket.id);
    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });

  //Runs when client disconnect
  socket.on("disconnect", () => {
    const user = userLeaveChat(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(botName, `${user.username} has left the chat`)
      );

      //Users and Room Info
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRooms(user.room),
      });
    }
  });
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => console.log(`Server Running on Port : ${PORT}`));
