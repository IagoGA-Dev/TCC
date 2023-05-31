import React from "react";

interface DarkButtonProps {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
  className?: string;
}

function DarkButton({ icon, text, onClick, className }: DarkButtonProps) {
  return (
    <button
      className={`flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-300 ease-in-out
        ${className && className}
      `}
      onClick={onClick}
    >
      {icon}
      <span className="text-gray-700">{text}</span>
    </button>
  );
}

export default DarkButton;
