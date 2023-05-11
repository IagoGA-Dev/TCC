import { FaRegEnvelope, FaRegCalendarAlt, FaRegClock } from "react-icons/fa";

// Dados do gráfico
interface GraphData {
  day: string;
  interactions: number;
}

const graphData: GraphData[] = [
  { day: "Seg", interactions: 30 },
  { day: "Ter ", interactions: 20 },
  { day: "Qua", interactions: 30 },
  { day: "Qui", interactions: 10 },
  { day: "Sex", interactions: 50 },
  { day: "Sáb", interactions: 30 },
  { day: "Dom", interactions: 50 },
];


// Dados dos cards
interface CardData {
  Icon: any;
  title: string;
  children: any;
  important?: boolean;
}

const cardData: CardData[] = [
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

export { graphData, cardData };