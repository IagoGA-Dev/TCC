import React from "react";

type DarkButtonProps = {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
};

function DarkButton({ icon, text, onClick, className, type = "button" }: DarkButtonProps) {
  return (
    <button
      className={`flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-300 ease-in-out
        ${className && className}
      `}
      onClick={onClick}
      type={type}
    >
      {icon}
      <span className="text-gray-700">{text}</span>
    </button>
  );
}

export default DarkButton;
