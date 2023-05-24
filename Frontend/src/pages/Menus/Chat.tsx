import React, { useState } from "react";
import { FiPaperclip, FiImage, FiFile, FiTrash2, FiFlag } from "react-icons/fi";
import { MdOutlineGroups } from "react-icons/md";
import { AiOutlineArrowRight } from "react-icons/ai";
import Modal from "react-modal";
import MenuTitle from "../../components/MenuTitle";
import Card from "../../components/Card";

interface ChatMessageProps {
  message: string;
  type: "text" | "image" | "file";
  id: number;
  onDelete: (id: number) => void;
  onReport: (id: number) => void;
}

function ChatHeader() {
  return (
    <div className="flex items-center bg-gray-100 p-4">
      <img
        src="https://picsum.photos/200"
        alt="Avatar do usuário"
        className="w-12 h-12 rounded-full mr-4"
      />
      <div>
        <h2 className="font-bold text-lg">Grupo 1</h2>
        <span className="text-gray-500 text-sm">Criado por John Doe</span>
      </div>
    </div>
  );
}

function ChatMessageActions({ id, onDelete, onReport }: { id: number, onDelete: (id: number) => void, onReport: (id: number) => void }) {
  const [showActions, setShowActions] = useState(false);

  return (
    <div className="absolute top-0 right-0 mt-2 mr-2">
      <button
        className={`text-gray-600 text-xl ${showActions ? "bg-gray-200" : ""}`}
        onClick={() => setShowActions(!showActions)}
      >
        ...
      </button>
      {showActions && (
        <div className="flex flex-col absolute top-0 right-0 mt-8 mr-2 bg-white border border-gray-300 rounded-lg p-2">
          <button className="flex items-center text-gray-600 text-sm hover:text-red-500" onClick={() => onDelete(id)}>
            <FiTrash2 className="mr-2" />
            <span>Delete</span>
          </button>
          <button className="flex items-center text-gray-600 text-sm hover:text-red-500" onClick={() => onReport(id)}>
            <FiFlag className="mr-2" />
            <span>Report</span>
          </button>
        </div>
      )}
    </div>
  );
}

function ChatMessage({ message, type, id, onDelete, onReport }: ChatMessageProps) {
  const [showModal, setShowModal] = useState(false);

  const handleImageClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div className="flex items-start mb-4 relative">
      <img
        src="https://picsum.photos/200"
        alt="Avatar do usuário"
        className="w-10 h-10 rounded-full mr-4"
      />
      <Card date="12:34 PM" className="p-2 rounded-lg bg-gray-200">
        {type === "text" && <div className="text-lg">{message}</div>}
        {type === "image" && (
          <div className="cursor-pointer" onClick={handleImageClick}>
            <img src={message} alt="Imagem enviada pelo usuário" />
          </div>
        )}
        {type === "file" && (
          <div
            className="flex items-center cursor-pointer border border-gray-300 rounded-lg p-2"
            onClick={() => {
              window.open(message, "_blank");
            }}
          >
            <FiFile className="text-gray-500 mr-2" />
            <div className="flex flex-col">
              <div className="text-sm font-medium">{message.split("/").pop()}</div>
              <div className="text-xs text-gray-500">{message.split(".").pop()}</div>
            </div>
          </div>
        )}
        <ChatMessageActions id={id} onDelete={onDelete} onReport={onReport} />
      </Card>
      <Modal isOpen={showModal} onRequestClose={handleModalClose} className="modal" overlayClassName="overlay">
        <img src={message} alt="Imagem em tamanho grande" />
      </Modal>
    </div>
  );
}

interface ChatMessagesProps {
  messages: { message: string; type: "text" | "image" | "file"; id: number }[];
  onDelete: (id: number) => void;
  onReport: (id: number) => void;
}

function ChatMessages({ messages, onDelete, onReport }: ChatMessagesProps) {
  return (
    <div className="overflow-y-auto p-4">
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message.message} type={message.type} id={message.id} onDelete={onDelete} onReport={onReport} />
      ))}
    </div>
  );
}

interface ChatInputProps {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => void;
}

function ChatInput({ message, setMessage, handleSendMessage }: ChatInputProps) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Digite sua mensagem..."
        className="w-full border border-gray-300 rounded-lg p-4 pl-10 text-lg bg-gray-100"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
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
  );
}

function GroupInfo() {
  return (
    <div className="bg-white p-4 text-center">
      <h2 className="text-lg font-bold mb-4">Grupo 1</h2>
      <div className="flex items-center mb-2">
        <img
          src="https://picsum.photos/200"
          alt="Avatar do grupo"
          className="w-8 h-8 rounded-full mr-2"
        />
        <span className="text-gray-500 text-sm">Criado por John Doe</span>
      </div>
      <div className="flex items-center mb-2">
        <span className="text-gray-500 text-sm mr-2">Membros:</span>
        <img
          src="https://picsum.photos/200"
          alt="Avatar do usuário"
          className="w-6 h-6 rounded-full mr-1"
        />
        <img
          src="https://picsum.photos/200"
          alt="Avatar do usuário"
          className="w-6 h-6 rounded-full mr-1"
        />
        <img
          src="https://picsum.photos/200"
          alt="Avatar do usuário"
          className="w-6 h-6 rounded-full mr-1"
        />
        <img
          src="https://picsum.photos/200"
          alt="Avatar do usuário"
          className="w-6 h-6 rounded-full mr-1"
        />
        <img
          src="https://picsum.photos/200"
          alt="Avatar do usuário"
          className="w-6 h-6 rounded-full mr-1"
        />
      </div>
      <div className="flex items-center mb-2">
        <span className="text-gray-500 text-sm mr-2">Descrição:</span>
        <span className="text-gray-500 text-sm">
          Este é um grupo para discutir o projeto.
        </span>
      </div>
    </div>
  );
}

function Chat() {
  const [messages, setMessages] = useState<{ message: string; type: "text" | "image" | "file"; id: number }[]>([
    { message: "Olá a todos!", type: "text", id: 1 },
    { message: "Como vocês estão hoje?", type: "text", id: 2 },
    { message: "Alguém pode me ajudar com este problema?", type: "text", id: 3 },
    { message: "https://picsum.photos/200", type: "image", id: 4 },
    {
      message:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      type: "file",
      id: 5,
    },
  ]);
  const [message, setMessage] = useState<string>("");

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      const newMessage = { message, type: "text", id: messages.length + 1 };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  const handleDeleteMessage = (id: number) => {
    setMessages(messages.filter((message) => message.id !== id));
  };

  const handleReportMessage = (id: number) => {
    console.log(`Message with id ${id} reported`);
  };

  return (
    <div className="flex flex-col h-full font-sans">
      <MenuTitle icon={<MdOutlineGroups />} title="Chat">
        <></>
      </MenuTitle>
      <div className="flex flex-row h-full">
        <div className="flex flex-col w-3/4 h-full border-r border-gray-300">
          <ChatHeader />
          {/* Adicionando scroll */}
          <div className="flex-grow">
            <ChatMessages messages={messages} onDelete={handleDeleteMessage} onReport={handleReportMessage} />
          </div>
          <ChatInput
            message={message}
            setMessage={setMessage}
            handleSendMessage={handleSendMessage}
          />
        </div>
        <div className="w-1/4 bg-white p-4">
          <GroupInfo />
        </div>
      </div>
    </div>
  );
}

export default Chat;