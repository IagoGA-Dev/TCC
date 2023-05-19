import React from "react";
import { BsX } from "react-icons/bs";
import DarkButton from "./DarkButton";

interface ModalProps {
  title: string;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  buttons?: {
    icon: React.ReactNode;
    text: string;
    onClick: () => void;
  }[];
}

const Modal: React.FC<ModalProps> = ({
  title,
  showModal,
  setShowModal,
  children,
  buttons = [],
}) => {
  return (
    <>
      {/* Fundo escuro */}
      <div
        className={`${
          showModal ? "flex" : "hidden"
        } fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50`}
        onClick={() => setShowModal(false)}
      ></div>

      {/* Modal */}
      <div
        className={`${
          showModal ? "flex-col" : "hidden"
        } fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg z-50 shadow-lg`}
      >
        {/* Cabeçalho */}
        <div className="flex flex-row justify-between items-center w-full px-4 py-2 border-b">
          <h1 className="text-lg font-semibold">{title}</h1>
          <BsX
            className="text-xl cursor-pointer hover:text-gray-500 transition-colors duration-200"
            onClick={() => setShowModal(false)}
          />
        </div>
        {/* Corpo */}
        <div className="flex flex-col w-full p-4">{children}</div>
        {/* Rodapé */}
        {buttons.length > 0 && (
          <div className="flex flex-row justify-end items-center w-full p-4 border-t gap-5">
            {buttons.map(
              (
                button: {
                  icon: React.ReactNode;
                  text: string;
                  onClick: () => void;
                },
                index: number
              ) => (
                <DarkButton
                  key={index}
                  icon={button.icon}
                  text={button.text}
                  onClick={button.onClick}
                />
              )
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Modal;
