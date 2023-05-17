import { FaRegEnvelope, FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import { GoReport } from "react-icons/go";
import { BiWinkSmile } from "react-icons/bi";
import { Card, Event, Graph, Message, User, globalMessages, Task } from "./types";


// Dados do gráfico
const graphData: Graph[] = [
  { day: "Seg", interactions: 30 },
  { day: "Ter ", interactions: 20 },
  { day: "Qua", interactions: 30 },
  { day: "Qui", interactions: 10 },
  { day: "Sex", interactions: 50 },
  { day: "Sáb", interactions: 30 },
  { day: "Dom", interactions: 50 },
];

// Dados dos cards
const cardData: Card[] = [
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
const userData: User = {
  name: "John Doe",
  avatar:
    "https://i.pinimg.com/736x/bd/00/28/bd0028886cbe68a675b127cd751dba90.jpg",
  online: true,
  role: "Moderador",
  school: "IFSP",
};

// Dados das mensagens
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

// Dados das mensagens globais
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

// Dados dos eventos
const eventData: Event[] = [
  {
    id: 1,
    title: "Prova de matemática",
    date: new Date(2023, 4, 17),
    color: "red",
  },
  {
    id: 2,
    title: "Apresentação de inglês",
    date: new Date(2023, 4, 18),
    color: "blue",
  },
  {
    id: 3,
    title: "Projeto de ciências",
    date: new Date(2023, 4, 19),
    color: "green",
  },
];

// Dados das tarefas
const taskData: Task[] = [
  {
    id: 1,
    title: "Terminar a lição de matemática",
    description: "Resolver os exercícios 1 a 10 do capítulo 3",
    status: "todo",
  },
  {
    id: 2,
    title: "Estudar para a prova de ciências",
    description: "Revisar as notas e assistir aos vídeos sobre o tema",
    status: "em desenvolvimento",
  },
  {
    id: 3,
    title: "Escrever um texto para a aula de inglês",
    description: "Escolher um tema e escrever pelo menos 500 palavras",
    status: "terminado",
  },
];

export { graphData, cardData, userData, messageData, globalMessagesData, eventData, taskData };
