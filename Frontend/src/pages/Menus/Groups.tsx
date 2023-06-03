// TODO: Arrumar barra de busca

import { useEffect, useState } from "react";
import Card from "../../components/Card";
import MenuTitle from "../../components/MenuTitle";
import { MdOutlineGroups } from "react-icons/md";
import DarkButton from "../../components/DarkButton";
import { BsPlusCircleDotted } from "react-icons/bs";
import api from "../../services/api";

import Modal from "react-modal";

// Redux de chat
import { useSelector, useDispatch } from "react-redux";
import { changeGroupID } from "../../redux/chatSlice";
import { RootState } from "../../redux/store";

interface Group {
  ID: number;
  Nome: string;
  Categoria: string;
  Descricao: string;
  Imagem: string;
  Membros: number;
  createdAt: Date;
}

function addZeros(number: number) {
  const zeros = "000";
  return (zeros + number).slice(-zeros.length);
}

async function fetchGroups() {
  // ! Existem alguns parametros faltando, como Descrição e Imagem.
  const response = await api.get("/grupo/");
  const data = await response.data;
  return data;
}

interface GroupCardProps extends Group {
  redirect: (active: string) => void;
}

function GroupCard({
  ID,
  Nome,
  Descricao,
  Imagem,
  Membros,
  createdAt,
  redirect,
}: GroupCardProps) {

  const dispatch = useDispatch();

  // * Função que gerencia o redirecionamento para a página de chat
  function handleClick(Group_ID: number, dispatch: any) {
    dispatch(changeGroupID(Group_ID));
  }

  return (
    <Card
      title={`#${addZeros(ID)}`}
      Icon={() => <div></div>}
      date={""}
      redirect={redirect}
      route={"chat"}
      onClick={() => handleClick(ID, dispatch)}
    >
      <div className="flex flex-col items-center">
        <img src={Imagem} alt={Nome} className="w-32 h-32 rounded-full mb-4" />
        <div className="text-xl font-bold mb-2">{Nome}</div>
        <div className="text-sm text-center mb-2">{Descricao}</div>
        <div className="text-xs text-gray-500 mb-1">Membros: {Membros}</div>
        <div className="text-xs text-gray-500">
          Criado em:{" "}
          {new Date(createdAt).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </div>
      </div>
    </Card>
  );
}

function Groups({ redirect }: { redirect: (active: string) => void }) {
  // * Estado para a barra de busca
  const [searchTerm, setSearchTerm] = useState("");
  const [groups, setGroups] = useState<Group[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchGroups().then((data) => {
      setGroups(data);
    });
  }, []);

  const filteredGroups = groups.filter((group) => {
    const name = group.Nome;
    const description = group.Descricao;
    const term = searchTerm.toLowerCase();

    return (
      name.toLowerCase().includes(term) ||
      description.toLowerCase().includes(term)
    );
  });

  return (
    <div>
      <MenuTitle
        icon={<MdOutlineGroups className="inline-block" />}
        title="Grupos"
      >
        <DarkButton
          icon={<BsPlusCircleDotted className="w-6 h-6 text-gray-700" />}
          text="Novo Grupo"
          onClick={() => setShowModal(true)}
        />
      </MenuTitle>
      <div className="py-9 bg-gray-50">
        {/* Barra de busca */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Pesquisar grupo"
            className="w-64 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* Grupos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
          {filteredGroups.map((group) => (
            <GroupCard key={group.ID} {...group} redirect={redirect} />
          ))}
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border rounded-md outline-none shadow-lg"
        overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75"
      >
        <div className="bg-white rounded-md w-96 p-4">
          <div className="text-xl font-bold mb-2 text-center">Novo Grupo</div>
          <hr />
          <form className="flex flex-col gap-4 mt-3">
            <label className="flex flex-col">
              <span className="text-sm text-gray-500 mb-2">Nome do Grupo</span>
              <input
                type="text"
                className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-sm text-gray-500 mb-2">
                Descrição do Grupo
              </span>
              <input
                type="text"
                className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-sm text-gray-500 mb-2">Categoria</span>
              <select
                className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue="default"
              >
                <option value="default" disabled>
                  Selecione uma categoria
                </option>
                <option value="1">Categoria 1</option>
                <option value="2">Categoria 2</option>
                <option value="3">Categoria 3</option>
              </select>
            </label>
            {/* <label className="flex flex-col">
              <span className="text-sm text-gray-500 mb-2">Imagem</span>
              <input
                type="file"
                className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label> */}
            <label className="flex flex-col">
              {/* Temporáriamente até eu descobrir como vou fazer o upload da imagem */}
              {/* O problema é abrir a porta para alguma vulnerabilidade */}
              <span className="text-sm text-gray-500 mb-2">Imagem (URL)</span>
              <input
                type="text"
                className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
          </form>
          <div className="flex justify-start gap-4 mt-6 font-medium font-montserrat">
            <div className="flex-1">
              <DarkButton icon={<></>} text="Criar"
                onClick={() => setShowModal(false)}
                className="w-full justify-center"
              />
            </div>
            <div className="flex-1">
              <DarkButton
                icon={<></>}
                text="Cancelar"
                onClick={() => setShowModal(false)}
                className="w-full justify-center"
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Groups;
