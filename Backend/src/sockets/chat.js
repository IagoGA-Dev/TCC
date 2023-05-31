const io = require("socket.io");
const events = require("events");
const eventEmitter = new events.EventEmitter();

module.exports = (server) => {
  const io = require("socket.io")(server);
  const chat = io.of("/chat");

  // Conexão
  chat.on("connection", (socket) => {
    socket.emit("connected", socket.user.id);

    // Aguardar mensagem
    socket.on("message", (message) => {
      if (!message.text && !message.image && !message.file && !message.size) return;

      message.ID_Usuario = socket.user.id;
      message.Data = new Date();
      message.ID_Grupo = 1;
      message.Texto = message.text;
      message.Imagem = message.image;
      message.Arquivo = message.file;
      message.Tamanho = message.size;

      eventEmitter.emit("save-message", message);
      socket.broadcast.emit("message", message);
    });

    // Enviar mensagens antigas
    socket.on("get-messages", async () => {
      var messages = []
      console.log("get-messages");
      const { Mensagem } = require("../models");
      await Mensagem.findAll({
        where: {
          ID_Grupo: 1
        },
        order: [
          ['Data', 'ASC']
        ]
      }).then((result) => {
        console.log("get-messages result");
        result.forEach((message) => {
          messages.push({
            text: message.Texto,
            image: message.Imagem,
            file: message.Arquivo,
            size: message.Tamanho
          });
        });
      });

      for (const message of messages) {
        console.log(message);
      }

      socket.emit("get-messages", messages);
      
      console.log("get-messages finalizado");

    });
  });

  // Autenticação
  chat.use((socket, next) => {
    const jwt = require("jsonwebtoken");
    const { token } = socket.handshake.auth;
    if (!token) return next(new Error("Acesso negado. Token não fornecido."));

    const { decryptToken } = require("../middleware/auth");

    if(jwt.decode(token) === null) return next(new Error("Acesso negado. Token inválido."));
    if(jwt.decode(token).exp < Date.now() / 1000) return next(new Error("Acesso negado. Token expirado."));

    const user = decryptToken(token);
    socket.user = user;
    next();

  });

  // Eventos
  // Salvar mensagem no banco de dados
  eventEmitter.on("save-message", (message) => {
    // | ID | ID_Usuario | Data | ID_Grupo | Texto | Imagem | Arquivo | Tamanho |
    const { Mensagem } = require("../models");
    Mensagem.create(message);
    console.log(`Mensagem salva no banco de dados!`);
  });
};
