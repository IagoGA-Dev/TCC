import { useState } from "react";
import { BsPlusCircleDotted } from "react-icons/bs";
import { globalMessagesData, messageData } from "../../data";

interface MessageCardProps {
  avatar: string;
  name: string;
  role: string;
  school: string;
  message: string;
}

function MessageCard({
  avatar,
  name,
  role,
  school,
}: MessageCardProps) {
  return (
    <div className="flex flex-row items-center justify-between p-4 bg-white rounded-md shadow-md">
      <div className="flex flex-row items-center gap-4">
        <img className="w-12 h-12 rounded-full" src={avatar} alt="avatar" />
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold text-gray-700">{name}</h1>
          <h2 className="text-sm font-semibold text-gray-500">
            {role} - {school}
          </h2>
        </div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <button className="flex flex-row items-center gap-2 bg-gray-100 px-4 py-2 rounded-md">
          <BsPlusCircleDotted className="w-6 h-6 text-gray-700" />
          <span className="text-gray-700">Novo</span>
        </button>
      </div>
    </div>
  );
}

function Messages() {
  const [messages] = useState(messageData);

  interface globalMessages {
    name: string;
    message: string;
  }
  const [globalMessages, setGlobalMessages] = useState(globalMessagesData as globalMessages[]);

  const [inputMessage, setInputMessage] = useState("");

  return (
    <div className="flex flex-col flex-grow p-4">
      <h1 className="text-2xl font-bold text-gray-700">Mensagens</h1>
      <div className="flex flex-col flex-grow gap-4 mt-4">
        {messages.map((message) => (
          <MessageCard
            avatar={message.avatar}
            name={message.name}
            role={message.role}
            school={message.school}
            message={message.message}
          />
        ))}

        {/* Chat global pra testar a funcionalidade */}
        <div className="flex flex-col flex-grow p-4 bg-white rounded-md shadow-md justify-between">
          <h1 className="text-lg font-semibold text-gray-700">Chat global</h1>
          <div className="flex flex-col flex-grow gap-4 mt-4 overflow-y-auto max-h-96">
            {globalMessages.map((message) => (
              <div className="flex flex-row items-center gap-4">
                <img
                  className="w-12 h-12 rounded-full"
                  src="https://via.placeholder.com/200"
                  alt="avatar"
                />
                <div className="flex flex-col">
                  <h1 className="text-lg font-semibold text-gray-700">
                    {message.name}
                  </h1>
                  <h2 className="text-sm font-semibold text-gray-500">
                    {message.message}
                  </h2>
                </div>
              </div>
            ))}
          </div>
          {/* Input de mensagem */}
          <div className="flex flex-row items-center gap-4">
            <input
              className="flex-grow px-4 py-2 bg-gray-100 rounded-md"
              type="text"
              placeholder="Digite sua mensagem"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setGlobalMessages([
                    ...globalMessages,
                    { name: "Você", message: inputMessage },
                  ]);
                  setInputMessage("");
                  const chatBox = document.querySelector(
                    ".flex.flex-col.flex-grow.gap-4.mt-4.overflow-y-auto.max-h-96"
                  ) as HTMLDivElement;
                  chatBox.scrollTop = chatBox.scrollHeight;
                  
                }
              }}
            />
            <button
              className="flex flex-row items-center gap-2 bg-gray-100 px-4 py-2 rounded-md"
              onClick={() => {
                setGlobalMessages([
                  ...globalMessages,
                  { name: "Você", message: inputMessage },
                ]);
                setInputMessage("");
              }}
            >
              <BsPlusCircleDotted className="w-6 h-6 text-gray-700" />
              <span className="text-gray-700">Enviar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messages;
