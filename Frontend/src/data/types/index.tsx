import { IconType } from "react-icons";

// Dados do gráfico
interface Graph {
  day: string;
  interactions: number;
}

// Dados dos cards
interface Card {
  Icon: IconType;
  title: string;
  children: React.ReactNode;
  important?: boolean;
  route?: string;
}

// Dados do usuário
interface User {
  name: string;
  avatar: string;
  online: boolean;
  role?: string;
  school?: string;
}

// Mensagens
interface Message {
  id: number;
  avatar: string;
  name: string;
  role: string;
  school: string;
  message: string;
}

// Eventos
interface Event {
  id: number;
  title: string;
  date: Date;
  color: "blue" | "green" | "yellow" | "red";
}

// Tarefas
interface Task {
  id: number;
  title: string;
  description: string;
  status: "pendente" | "em desenvolvimento" | "terminado";
}

interface message_type {
  ID?: number;
  ID_Usuario: number;
  ID_Grupo: number;
  Data: Date;
  Mensagem: string
  Tipo: "Texto" | "Imagem" | "Arquivo";
}

export type { Graph, Card, User, Message, Event, Task, message_type };