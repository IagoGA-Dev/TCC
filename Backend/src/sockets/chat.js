const io = require("socket.io");

module.exports = (server) => {
  const io = require("socket.io")(server);

  const chat = io.of("/chat");

  chat.on("connection", (socket) => {
    console.log(`Socket conectado: ${socket.id}`);
    chat.emit("receive-message", "Olá");
    socket.on("message", (message) => {
      chat.emit("receive-message", message);
    });
  });

  chat.on("disconnect", (socket) => {
    console.log(`Socket desconectado: ${socket.id}`);
  });

  chat.use((socket, next) => {
    if (socket.handshake.auth.token) {
      console.log("Autenticado");
      next();
    } else {
      console.log("Não autenticado");
      next(new Error("Não autenticado"));
    }
  });
};
