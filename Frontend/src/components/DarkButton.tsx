import React from "react";

{/* <button
  className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-md"
  onClick={() => setShowModal(true)}
>
  <AiOutlinePlus className="w-6 h-6 text-gray-700" />
  <span className="text-gray-700">Novo evento</span>
</button>; */}

interface DarkButtonProps {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
}


function DarkButton({ icon, text, onClick }: DarkButtonProps) {
  return (
    <button
      className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-md"
      onClick={onClick}
    >
      {icon}
      <span className="text-gray-700">{text}</span>
    </button>
  );
}

export default DarkButton;
