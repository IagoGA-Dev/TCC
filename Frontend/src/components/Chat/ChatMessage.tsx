import Card from "../Card";
import { message_type } from "../../data/types";
import { FiFile } from "react-icons/fi";

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

export default ChatMessage;