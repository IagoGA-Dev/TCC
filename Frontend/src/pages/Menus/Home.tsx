// TODO: É necessário fazer um redesign dessa interface para ficar de acordo com as outras (usando MenuTitle e DarkButton).

import Card from "../../components/Card";
import Chart from "../../components/Graph";
import { useState } from "react";
import { FaChartBar } from "react-icons/fa";
import {
  BsPlusCircleDotted,
  BsCalendar,
  BsCheckCircle,
  BsChatDots,
} from "react-icons/bs";
import { AiOutlineArrowRight } from "react-icons/ai";
import { cardData, graphData } from "../../data";
import { userData } from "../../data";
import DarkButton from "../../components/DarkButton";
import MenuTitle from "../../components/MenuTitle";

// Gera os cards
function CardList({ redirect }: HomeProps) {
  // Vou arrumar posteriormente se precisar
  return (
    <div className="flex flex-row gap-6">
      {cardData.map((card) => (
        <Card
          Icon={card.Icon}
          title={card.title}
          important={card.important}
          redirect={redirect}
          route={card.route}
        >
          {card.children}
        </Card>
      ))}
      <Card Icon={FaChartBar} title="Gráfico de interações" className="">
          <Chart data={graphData} widthP={100} height={75} />
      </Card>
    </div>
  );
}

// Botão de novo
function NewButton() {
  const [popup, setPopup] = useState(false);

  const menuButton = (name: string, Icon: any) => (
    <button className="flex flex-col items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md">
      <Icon className="w-6 h-6 text-gray-700" />
      <span className="text-gray-700">{name}</span>
    </button>
  );

  return (
    <div>
      <DarkButton
        icon={<BsPlusCircleDotted className="w-6 h-6 text-gray-700" />}
        text="Novo"
        onClick={() => setPopup(!popup)}
      />

      <div
        className={`fixed top-0 right-0 w-1/4 h-full bg-white shadow-md transition duration-200 ease-in-out z-50
        ${popup ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex flex-col gap-4 p-6">
          <button
            className="flex justify-start"
            onClick={() => setPopup(!popup)}
          >
            <AiOutlineArrowRight className="w-8 h-8 text-gray-700" />
          </button>
          {menuButton("Evento", BsCalendar)}
          {menuButton("Tarefa", BsCheckCircle)}
          {menuButton("Mensagem", BsChatDots)}
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <MenuTitle
      icon={
        <img
          className="w-8 h-8 rounded-full"
          src={userData.avatar}
          alt="avatar"
        />
      }
      title={`Bem vindo, ${userData.name}`}
    >
      <NewButton />
    </MenuTitle>
  );
}

interface HomeProps {
  redirect: (active: string) => void;
}

function Home({ redirect }: HomeProps) {
  return (
    <div>
      <Header />
      <div className="flex flex-col flex-1 p-6 gap-6 bg-gray-50">
        <CardList redirect={redirect} />
        {/* Parte principal vai ser uma lista de tarefas */}
      </div>
    </div>
  );
}

export default Home;
