import { AiOutlineArrowRight } from "react-icons/ai";
import { FiPaperclip, FiImage } from "react-icons/fi";

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

export default ChatInput;