// ! Removi chat global já que era temporário só pra testar como funciona e como seria a aparência.
// ! Mas não será implementado, só o chat de grupos.

// TODO: Usar card em vez de div customizado.
import { useState } from "react";
import { BsChatLeftDots, BsPlusCircleDotted } from "react-icons/bs";
import { messageData } from "../../data";
import { Message } from "../../data/types";
import MenuTitle from "../../components/MenuTitle";
import DarkButton from "../../components/DarkButton";
import Card from "../../components/Card";

function MessageCard({ avatar, name, role, school }: Message) {
  return (
    <Card
      className="p-4"
      applyDefaultClassNames={false}
    >
      {/* Não é como eu queria mas não encontro o erro em Card... */}
      <div className="flex flex-row">
      {/* Avatar, nome e role */}
      <div className="flex flex-row items-center gap-4">
        <img className="w-12 h-12 rounded-full" src={avatar} alt="avatar" />
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold text-gray-700">{name}</h1>
          <h2 className="text-sm font-semibold text-gray-500">
            {role} - {school}
          </h2>
        </div>
      </div>
      {/* Botão de ação */}
      <div className="flex flex-row items-center gap-4 ml-auto">
        <DarkButton
          icon={<BsPlusCircleDotted className="w-6 h-6 text-gray-700" />}
          text="Novo"
        />
      </div>
      </div>
    </Card>
  );
}

function Messages() {
  const [messages] = useState(messageData);

  return (
    <div className="flex flex-col flex-grow bg-gray-50">
      <MenuTitle
        icon={<BsChatLeftDots className="inline-block" />}
        title="Mensagens"
      >
        <DarkButton
          icon={<BsPlusCircleDotted className="w-6 h-6 text-gray-700" />}
          text="Nova Mensagem"
        />
      </MenuTitle>

      <div className="flex flex-col flex-grow gap-4 mt-4 p-4">
        {messages.map((message) => (
          <MessageCard
            key={message.id}
            id={message.id}
            avatar={message.avatar}
            name={message.name}
            role={message.role}
            school={message.school}
            message={message.message}
          />
        ))}
      </div>
    </div>
  );
}

export default Messages;
