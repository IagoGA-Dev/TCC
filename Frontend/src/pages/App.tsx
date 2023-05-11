import { FaRegEnvelope, FaRegCalendarAlt, FaRegClock, FaChartBar } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import Chart from "../components/Graph";

interface CardProps {
  Icon: any;
  title: string;
  children: any;
  important?: boolean;
}

const mockCards: CardProps[] = [
  {
    Icon: FaRegEnvelope,
    title: "Mensagens",
    children: <p className="text-xs text-gray-600">Você tem 3 novas mensagens</p>,
    important: true,
  },
  {
    Icon: FaRegCalendarAlt,
    title: "Eventos",
    children: <p className="text-xs text-gray-600">Você tem 2 novos eventos</p>,
  },
  {
    Icon: FaRegClock,
    title: "Tarefas",
    children: <p className="text-xs text-gray-600">Você tem 5 novas tarefas</p>,
  },
];

function CardList() {
  return (
    <div className="flex flex-row gap-6">
      {mockCards.map((card) => (
        <Card Icon={card.Icon} title={card.title} important={card.important}>
          {card.children}
        </Card>
      ))}
    </div>
  );
}

// Dados do gráfico
interface Data {
  day: string;
  interactions: number;
}

const data: Data[] = [
  { day: "Seg", interactions: 30 },
  { day: "Ter ", interactions: 20 },
  { day: "Qua", interactions: 30 },
  { day: "Qui", interactions: 10 },
  { day: "Sex", interactions: 50 },
  { day: "Sáb", interactions: 30 },
  { day: "Dom", interactions: 50 },
];

function App() {
  return (
    <div className="flex flex-row w-screen h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 bg-gray-100 p-6 gap-6">
        <CardList />
        {/* Gráfico com Rechart */}
          <Card
            Icon={FaChartBar}
            title="Gráfico de interações"
          >
            <Chart data={data} widthP={100} height={300} />
          </Card>
      </div>
    </div>
  );
}

export default App;
