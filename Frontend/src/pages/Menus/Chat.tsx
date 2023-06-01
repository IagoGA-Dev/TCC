import React, { useEffect, useState } from "react";
import { FiPaperclip, FiImage, FiFile } from "react-icons/fi";
import { MdOutlineGroups } from "react-icons/md";
import { AiOutlineArrowRight } from "react-icons/ai";
import MenuTitle from "../../components/MenuTitle";
import Card from "../../components/Card";
import chatSocketHandler from "../../utils/socketHandler";

interface message_type {
  ID?: number;
  ID_Usuario: number;
  ID_Grupo: number;
  Data: Date;
  Mensagem: string
  Tipo: "Texto" | "Imagem" | "Arquivo";
}

function ChatMessage({ message, type }: {message: message_type["Mensagem"] , type: message_type["Tipo"]}) {
  return (
    <div className="flex items-start mb-4 relative">
      <img
        src="https://picsum.photos/200"
        alt="Avatar do usuário"
        className="w-10 h-10 rounded-full mr-4"
      />
      <Card
        date={new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })}
        className="p-2 rounded-lg rounded-tl-none"
      >
        {type === "Texto" && <div className="text-lg">{message}</div>}
        {type === "Imagem" && (
          <div className="cursor-pointer">
            <img src={message} alt="Imagem enviada pelo usuário" />
          </div>
        )}
        {type === "Arquivo" && (
          <div
            className="flex items-center cursor-pointer border border-gray-300 rounded-lg p-2"
            onClick={() => {
              window.open(message, "_blank");
            }}
          >
            <FiFile className="text-gray-500 mr-2" />
            <div className="flex flex-col">
              <div className="text-sm font-medium">
                {message.split("/").pop()}
              </div>
              <div className="text-xs text-gray-500">
                {message.split(".").pop()}
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

function ChatMessages({messages}: {messages: message_type[]}){
  return (
    <div className="p-4 h-full overflow-y-auto" id="chat">
      {messages.map((message, index) => (
        <ChatMessage
          key={index}
          message={message.Mensagem}
          type={message.Tipo}
        />
      ))}
    </div>
  );
}

function ChatInput({ text, setMessage, handleSendMessage }: {text: string, setMessage: React.Dispatch<React.SetStateAction<string>>, handleSendMessage: () => void}) {
  return (
    <div>
      <div className="relative">
        <input
          type="text"
          placeholder="Digite sua mensagem..."
          className="w-full border border-gray-300 rounded-lg p-4 pl-10 text-lg bg-gray-100"
          value={text}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        />
        <div className="absolute top-0 right-0 h-full flex items-center mr-5">
          <button className="text-gray-600 text-xl" onClick={handleSendMessage}>
            <AiOutlineArrowRight />
          </button>
          <button className="ml-3 text-gray-600 text-xl">
            <FiPaperclip />
          </button>
          <button className="ml-3 text-gray-600 text-xl">
            <FiImage />
          </button>
        </div>
      </div>
    </div>
  );
}

function GroupInfo() {
  return (
    <div className="p-4 text-center flex flex-col h-full">
      {/* Imagem do grupo */}
      <img
        src="https://picsum.photos/200"
        alt="Avatar do grupo"
        className="w-32 h-32 rounded-full mx-auto mb-4"
      />
      <h1 className="text-2xl font-bold mb-2">Grupo de Teste</h1>
      {/* Criação */}
      <div className="flex items-center mb-2 pb-2 border-b-2">
        <img
          src="https://picsum.photos/200"
          alt="Avatar do grupo"
          className="w-8 h-8 rounded-full mr-2"
        />
        <span className="text-gray-700 text-sm">Criado por John Doe</span>
      </div>
      {/* Membros */}
      <div className="flex items-center mb-2 relative pb-2 border-b-2">
        <span className="text-gray-700 text-sm mr-2">Membros:</span>
        <img
          src="https://picsum.photos/200"
          alt="Avatar do usuário"
          className="w-6 h-6 rounded-full mr-1"
        />
        <img
          src="https://picsum.photos/500"
          alt="Avatar do usuário"
          className="w-6 h-6 rounded-full mr-1 -ml-4"
        />
        <img
          src="https://picsum.photos/600"
          alt="Avatar do usuário"
          className="w-6 h-6 rounded-full mr-1 -ml-4"
        />
        <span className="text-gray-700 text-sm">+ 3</span>
      </div>
      {/* Descrição */}
      <div className="flex items-center mb-2 pb-2 border-b-2">
        <span className="text-gray-700 text-sm mr-2">Descrição:</span>
        <span className="text-gray-700 text-sm">
          Este é um grupo para discutir o projeto.
        </span>
      </div>
      <div className="flex-grow"></div>
      {/* Botões */}
      <button className="rounded-lg py-2 px-4 bg-red-500 text-white font-bold mt-2">
        Sair do grupo
      </button>
      <button className="rounded-lg py-2 px-4 bg-gray-300 text-gray-700 font-bold mt-2">
        Excluir grupo
      </button>
    </div>
  );
}

function Chat() {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<message_type[]>([]);

  // Lidando com refresh e disconnect
  const onRefresh = (newToken: string) => window.localStorage.setItem("x-access-token", newToken);
  // const onDisconnect = window.location.href = "/login";
  function onDisconnect(err: string) {
    console.log(`Erro: ${err}`);
    // window.location.href = "/login";
  }

  // Criando socket
  const token = window.localStorage.getItem("x-access-token") || "";
  const refreshToken = window.localStorage.getItem("x-refresh-token") || "";
  const socket = new chatSocketHandler(1, token, refreshToken, onRefresh, onDisconnect);

  useEffect(() => {
    console.log("Deve ser chamado 1 vez");
    // socket.connect();
    socket.getMessages((messages: message_type[]) => {
      setMessages(messages);
    });
    socket.onMessage((message: any) => addMessage(message as message_type));

    // socket.sendMessage({
    //   ID_Usuario: 1,
    //   ID_Grupo: 1,
    //   Data: new Date(),
    //   Mensagem: "Olá, mundo!",
    //   Tipo: "Texto",

    // })

    }, []);

  // Adiciona uma mensagem ao chat
  const addMessage = (message: message_type) => {
    socket.sendMessage(message);
    setMessages((messages) => [...messages, message]);
  };

  // Lida com o envio de mensagens
  const handleSendMessage = () => {
    if (message.trim() !== "") {
      const newMessage: message_type = {
        ID_Usuario: 1,
        ID_Grupo: 1,
        Data: new Date(),
        Mensagem: message,
        Tipo: "Texto",
      };
      addMessage(newMessage);
      setMessage("");

      setTimeout(() => {
        const chat = document.getElementById("chat");
        if (chat) { chat.scrollTop = chat.scrollHeight; }
      }, 1);
    }
  };

  return (
    <div className="flex flex-col h-full font-sans">
      {/* Cabeçalho */}

      {/* Conteúdo */}
      <div className="flex flex-row h-full">
        {/* Chat */}
        <div className="w-3/4 flex flex-col">
          <MenuTitle icon={<MdOutlineGroups />} title={`Chat - Grupo de Teste`}>
            <></>
          </MenuTitle>
          <div className="flex flex-col flex-grow overflow-y-auto">
            <ChatMessages
              messages={messages}
            />
          </div>

          {/* Input */}
          <div className="w-full p-5">
            <ChatInput
              text={message}
              setMessage={setMessage}
              handleSendMessage={handleSendMessage}
            />
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col w-1/4 bg-white border-l-2">
          <div className="h-16 w-full bg-gray-50 border-b-2"></div>
          <div className="hidden md:block w-full bg-white p-4 ">
            <GroupInfo />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
