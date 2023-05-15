import { FaRegEnvelope, FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import { GoReport } from "react-icons/go";
import { BiWinkSmile } from "react-icons/bi";

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
    children: (
      <p className="text-xs text-gray-600">Você tem 3 novas mensagens</p>
    ),
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
  {
    Icon: GoReport,
    title: "Reportes",
    children: (
      <p
        className="text-xs text-gray-600 text-center
    "
      >
        Não há novos reportes <BiWinkSmile />
      </p>
    ),
  },
];

// Dados do usuário
interface UserData {
  name: string;
  avatar: string;
  online: boolean;
  role?: string;
  school?: string;
}

const userData: UserData = {
  name: "John Doe",
  avatar:
    "https://i.pinimg.com/736x/bd/00/28/bd0028886cbe68a675b127cd751dba90.jpg",
  online: true,
  role: "Moderador",
  school: "IFSP",
};

// Mensagens

interface Message {
  avatar: string;
  name: string;
  role: string;
  school: string;
  message: string;
}

const messageData: Message[] = [
  {
    avatar: "https://picsum.photos/200",
    name: "John Doe",
    role: "Moderador",
    school: "IFSP",
    message: "Lorem ipsum dolor sit amet",
  },
  {
    avatar: "https://picsum.photos/200",
    name: "John Doe",
    role: "Aluno",
    school: "IFSP",
    message: "Lorem ipsum dolor sit amet",
  },
  {
    avatar: "https://picsum.photos/200",
    name: "John Doe",
    role: "Professor",
    school: "IFSP",
    message: "Lorem ipsum dolor sit amet",
  },
];

interface globalMessages {
  name: string;
  message: string;
}

const globalMessagesData: globalMessages[] = [
  {
    name: "John Doe",
    message: "Lorem ipsum dolor sit amet",
  },
  {
    name: "Jane Doe",
    message: "Lorem ipsum dolor sit amet",
  },
  {
    name: "John Doe",
    message: "Lorem ipsum dolor sit amet",
  },
  {
    name: "Jane Doe",
    message: "Lorem ipsum dolor sit amet",
  },
];

export { graphData, cardData, userData, messageData, globalMessagesData };
