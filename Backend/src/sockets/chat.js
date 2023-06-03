const io = require("socket.io");
const events = require("events");
const eventEmitter = new events.EventEmitter();

module.exports = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  const chat = io.of("/chat");

  // Conexão
  chat.on("connection", (socket) => {
    console.log(`Nova conexão de ${socket.user.id} - ${new Date().toLocaleString('pt-BR')}`);
    socket.emit("connected", socket.user.id);

    socket.on("join", (room) => {
      socket.join(room);
      console.log(`Usuário ${socket.user.id} entrou na sala ${room} - ${new Date().toLocaleString('pt-BR')}`);
    });

    // Aguardar mensagem
    socket.on("message", (message) => {

      // console.log(`Mensagem recebida de ${socket.user.id} - ${new Date().toLocaleString('pt-BR')}`);
      // console.log(message)

      if (!message.ID && !message.Mensagem && !message.Tipo && !message.ID_Usuario && !message.ID_Grupo) return;

      message.ID = message.ID;
      message.ID_Usuario = socket.user.id;
      message.Data = new Date().toLocaleString('pt-BR');
      message.ID_Grupo = message.ID_Grupo;
      message.Mensagem = message.Mensagem;
      message.Tipo = message.Tipo;

      // TODO: Só adicionando um lembrete de onde ficará a verificação pela LLM para filtragem de mensagens

      // Simulando LLM
      if(message.Mensagem.includes("Teste")) {
        message.Mensagem = "Mensagem bloqueada pela LLM";
        message.Tipo = "Texto";
        // Exemplo de bloqueio
        // eventEmitter.emit("message-blocked", "Motivo do bloqueio");
        // socket.emit("message-blocked", "Motivo do bloqueio");
      }

      eventEmitter.emit("save-message", message);
      socket.broadcast.emit("receive-message", message);
    });

    // Enviar mensagens antigas
    socket.on("get-messages", async () => {
      var messages = []
      console.log(`get-messages chamado por ${socket.user.id} - ${new Date().toLocaleString('pt-BR')}`);
      const { Mensagem } = require("../models");
      await Mensagem.findAll({
        where: {
          ID_Grupo: socket.ID_Grupo,
        },
        order: [
          ['Data', 'ASC']
        ]
      }).then((result) => {
        result.forEach((message) => {
          messages.push({
            ID: message.ID,
            ID_Usuario: message.ID_Usuario,
            ID_Grupo: message.ID_Grupo,
            Data: message.Data,
            Mensagem: message.Mensagem,
            Tipo: message.Tipo
          });
        });
      });

      // for (const message of messages) {
      //   console.log(message);
      // }

      socket.emit("get-messages", messages);
      
      // console.log("get-messages finalizado");

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

  // ID do grupo
  chat.use((socket, next) => {  
    const { ID_Grupo } = socket.handshake.query;
    if (!ID_Grupo) return next(new Error("Acesso negado. ID_Grupo não fornecido."));
    socket.ID_Grupo = ID_Grupo;
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
