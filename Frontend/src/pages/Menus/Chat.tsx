import { useCallback, useEffect, useMemo, useState } from "react";
import { MdOutlineGroups } from "react-icons/md";
import MenuTitle from "../../components/MenuTitle";
import chatSocketHandler from "../../utils/socketHandler";

import GroupInfo from "../../components/Chat/GroupInfo";
import ChatMessage from "../../components/Chat/ChatMessage";
import ChatInput from "../../components/Chat/ChatInput";
import { message_type } from "../../data/types";

// Chat redux
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

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

const onRefresh = (newToken: string) => window.localStorage.setItem("x-access-token", newToken);
function onDisconnect() { window.location.href = "/login"; }

const scrollToBottom = (chat: HTMLElement | null) => {
  if (chat) { chat.scrollTop = chat.scrollHeight; }
}

const addMessage = (message: message_type, messages: message_type[], setMessages: React.Dispatch<React.SetStateAction<message_type[]>>) => {
  if (messages.some((m) => m.ID === message.ID)) return;

  setMessages((messages) => [...messages, message]);
  scrollToBottom(document.getElementById("chat"));
}

const handleOnMessage = (message: message_type, messages: message_type[], setMessages: React.Dispatch<React.SetStateAction<message_type[]>>) => {
  const newMessage = message as message_type;
  messages.filter((m) => m.ID === newMessage.ID).length === 0 && addMessage(newMessage, messages, setMessages);
}

function Chat() {
  const ID_Grupo = useSelector((state: RootState) => state.chat.group_ID);

  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<message_type[]>([]);

  const handleHandleOnMessage = (message: message_type) => handleOnMessage(message, messages, setMessages);

  const socket = useMemo(() => {
    const token = window.localStorage.getItem("x-access-token") || "";
    const refreshToken = window.localStorage.getItem("x-refresh-token") || "";
    return new chatSocketHandler(ID_Grupo, token, refreshToken, onRefresh, onDisconnect);
  }, []);

  useEffect(() => {
    console.log("[-] Get Messages")
    socket.getMessages((messages: message_type[]) => {
      setMessages(messages);
    });
  }, [socket]);

  // useEffect(() => {
  //   socket.onMessage(handleHandleOnMessage);
  //   return () => {
  //     socket.offMessage(handleHandleOnMessage);
  //   };
  // }, [socket, messages, handleHandleOnMessage]);

  useMemo(() => {
    socket.onMessage(handleHandleOnMessage);
    return () => {
      socket.offMessage(handleHandleOnMessage);
    };
  }, []);


  useEffect(() => {
    scrollToBottom(document.getElementById("chat"));
  }, [messages]);

  const sendMessage = (message: message_type) => {
    socket.sendMessage(message);
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      const newMessage: message_type = {
        ID: Math.floor(Math.random() * 1000000),
        ID_Usuario: 1,
        ID_Grupo: ID_Grupo,
        Data: new Date(),
        Mensagem: message,
        Tipo: "Texto",
      };
      sendMessage(newMessage);
      addMessage(newMessage, messages, setMessages); // <- Quebrado
      setMessage("");
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
