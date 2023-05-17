// Dados do gráfico
interface Graph {
  day: string;
  interactions: number;
}

// Dados dos cards
interface Card {
  Icon: any;
  title: string;
  children: any;
  important?: boolean;
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
  avatar: string;
  name: string;
  role: string;
  school: string;
  message: string;
}

// Mensagens globais
interface globalMessages {
  name: string;
  message: string;
}

// Eventos
interface Event {
  id: number;
  title: string;
  date: Date;
  color: string;
}

// Tarefas
interface Task {
  id: number;
  title: string;
  description: string;
  status: "todo" | "em desenvolvimento" | "terminado";
}

export type { Graph, Card, User, Message, globalMessages, Event, Task };