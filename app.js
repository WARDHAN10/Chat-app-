const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const server = http.createServer(app);
const socketio = require("socket.io");
const bodyP = require("body-parser");
const Router = require("./Routes");
const formatMessage = require("./messages");
const io = socketio(server);
const botName = "COMP";
app.use(express.static(path.join(__dirname, "public")));
app.use("/webmobi", Router);
//run when it run
io.on("connection", (socket) => {
  console.log("new WS connection");
  //welcome cureent user
  socket.emit("message", formatMessage(botName, "Welcome to the chat"));

  //user connect
  socket.broadcast.emit(
    "message",
    formatMessage(botName, "A user has connected")
  );
  //disconnect
  socket.on("disconnect", () => {
    io.emit("message", formatMessage(botName, "A user has left the chat"));
  });
  //listen for chat msg
  socket.on("chatMessage", (msg) => {
    io.emit("message", formatMessage("user", msg));
  });
});

const PORT = process.env.PORT || 9000;
server.listen(PORT, () => {
  console.log("listening on ", PORT);
});
