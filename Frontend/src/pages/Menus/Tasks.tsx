// TODO(ironicamente): Tranformar o modal em um componente reutilizável.
// TODO: Model está bem quebrado. Vou desabilitar temporariamente até arrumar. Deve ser algo com o estado. O componente em si funciona bem.
import { useState } from "react";
import {
  BsCardChecklist,
  BsCheck,
  BsListTask,
  BsPencil,
  BsTrash,
  BsX,
} from "react-icons/bs";
import Card from "../../components/Card";
import MenuTitle from "../../components/MenuTitle";
import DarkButton from "../../components/DarkButton";
import { AiOutlinePlus } from "react-icons/ai";
import { taskData } from "../../data";
import { Task } from "../../data/types";
import Modal from "../../components/Modal";

function Tasks() {
  // * Estado para as tarefas
  const [tasks, setTasks] = useState<Task[]>(taskData);

  //*  Estado para a visibilidade do modal e os valores dos inputs
  const [showModal, setShowModal] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [statusInput, setStatusInput] = useState<Task["status"]>("todo");

  // * Estado para a tarefa selecionada
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // * Função para adicionar uma nova tarefa ou editar uma existente
  const saveTask = () => {
    if (!titleInput || !descriptionInput || !statusInput) return;
    if (selectedTask) {
      // * Editar tarefa existente
      setTasks(
        tasks.map((task) =>
          task.id === selectedTask.id
            ? {
              ...task,
              title: titleInput,
              description: descriptionInput,
              status: statusInput,
            }
            : task
        )
      );
    } else {
      // * Adicionar nova tarefa
      setTasks([
        ...tasks,
        {
          id: Math.max(...tasks.map((task) => task.id)) + 1,
          title: titleInput,
          description: descriptionInput,
          status: statusInput,
        },
      ]);
    }
    setShowModal(false);
    setTitleInput("");
    setDescriptionInput("");
    setStatusInput("todo");
    setSelectedTask(null);
  };

  // * Função para deletar uma tarefa
  // const deleteTask = () => {
  //   if (!selectedTask) return;
  //   setTasks(tasks.filter((task) => task.id !== selectedTask.id));
  //   setShowModal(false);
  //   setTitleInput("");
  //   setDescriptionInput("");
  //   setStatusInput("todo");
  //   setSelectedTask(null);
  // };

  // * Função para selecionar uma tarefa e mostrar seus detalhes
  const selectTask = (task: Task) => {
    setSelectedTask(task);
    setShowModal(true);
    setTitleInput(task.title);
    setDescriptionInput(task.description);
    setStatusInput(task.status);
  };

  // * Renderizar o componente da tarefa
  return (
    <div className="flex flex-col h-screen">
      {/* Cabeçalho */}
      <MenuTitle
        icon={<BsListTask className="inline-block mr-2" />}
        title="Tarefas"
      >
        <DarkButton
          icon={<AiOutlinePlus className="inline mr-2" />}
          text="Nova tarefa"
          onClick={() => setShowModal(true)}
        />
      </MenuTitle>

      {/* Corpo */}
      <div className="flex flex-row flex-1 bg-white p-4 gap-4 overflow-x-auto">
        {/* Cria colunas para cada status */}
        {["todo", "em desenvolvimento", "terminado"].map((status) => (
          <div
            key={status}
            className="flex flex-col flex-1 bg-gray-100 rounded-md p-4 gap-4"
          >
            <h2 className="text-lg font-bold text-gray-700 capitalize">
              {status}
            </h2>
            <div className="flex flex-col gap-4">
              {/* Renderiza as tarefas de acordo com o status */}
              {tasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <Card
                    Icon={BsCardChecklist}
                    date="Hoje"
                    title={task.title}
                  >
                    <div className="flex flex-row items-center justify-between">
                      <button
                        className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-md"
                        onClick={() => selectTask(task)}
                      >
                        <BsPencil className="w-6 h-6 text-gray-700" />
                        <span className="text-gray-700">Editar</span>
                      </button>
                      <button
                        className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-md"
                        onClick={() => selectTask(task)}
                      >
                        <BsTrash className="w-6 h-6 text-gray-700" />
                        <span className="text-gray-700">Excluir</span>
                      </button>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        title={selectedTask ? "Editar tarefa" : "Nova tarefa"}
        showModal={showModal}
        setShowModal={setShowModal}
        buttons={[
          {
            text: "Cancelar",
            icon: <BsX className="inline-block mr-2" />,
            onClick: () => setShowModal(false),
          },
          {
            text: selectedTask ? "Salvar" : "Adicionar",
            icon: <BsCheck className="inline-block mr-2" />,
            onClick: saveTask,
          },
        ]}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="title">Título</label>
            <input
              id="title"
              type="text"
              className="border border-gray-300 rounded-md px-4 py-2"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
            />
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              className="border border-gray-300 rounded-md px-4 py-2"
              value={descriptionInput}
              onChange={(e) => setDescriptionInput(e.target.value)}
            />
            <label htmlFor="status">Status</label>
            <select
              id="status"
              className="border border-gray-300 rounded-md px-4 py-2"
              value={statusInput}
              onChange={(e) => setStatusInput(e.target.value as Task["status"])}
            >
              <option value="todo">Todo</option>
              <option value="em desenvolvimento">Em desenvolvimento</option>
              <option value="terminado">Terminado</option>
            </select>
            <label htmlFor="date">Data</label>
            <input
              id="date"
              type="date"
              className="border border-gray-300 rounded-md px-4 py-2"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Tasks;
