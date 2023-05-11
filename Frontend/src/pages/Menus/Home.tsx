import Card from "../../components/Card";
import Chart from "../../components/Graph";
import { FaChartBar } from "react-icons/fa";
import { cardData, graphData } from "../../data";
import { userData } from "../../data";

// Gera os cards
function CardList() {
  return (
    <div className="flex flex-row gap-6">
      {cardData.map((card) => (
        <Card Icon={card.Icon} title={card.title} important={card.important}>
          {card.children}
        </Card>
      ))}
    </div>
  );
}

// Bem vindo inicial
function Welcome({ currentTime = new Date() }) {
  return (
    <div className="flex flex-row items-center justify-between p-6">
      <div className="flex flex-row items-center gap-4">
        <img
          className="w-12 h-12 rounded-full"
          src={userData.avatar}
          alt="avatar"
        />
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-gray-700">
            Bem vindo, {userData.name}
          </h1>
          <h2 className="text-lg font-semibold text-gray-500">
            {userData.role} - {userData.school} - {currentTime.toLocaleDateString()}
          </h2>
        </div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <button className="flex flex-row items-center gap-2 bg-gray-100 px-4 py-2 rounded-md">
          <img
            className="w-5 h-5"
            src="https://img.icons8.com/material-outlined/24/000000/plus--v1.png"
            alt="plus"
          />
          <span className="text-gray-700 font-semibold">Novo</span>
        </button>
      </div>
    </div>
  );
}

function Home() {
  return (
    <div>
      <Welcome />
      <div className="flex flex-col flex-1 p-6 gap-6">
        <CardList />
        <Card Icon={FaChartBar} title="Gráfico de interações">
          <Chart data={graphData} widthP={100} height={300} />
        </Card>
      </div>
    </div>
  );
}

export default Home;
