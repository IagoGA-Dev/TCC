// TODO: Arrumar barra de busca

import { useEffect, useState } from "react";
import Card from "../../components/Card";
import MenuTitle from "../../components/MenuTitle";
import { MdOutlineGroups } from "react-icons/md";
import DarkButton from "../../components/DarkButton";
import { BsPlusCircleDotted } from "react-icons/bs";
import api from "../../services/api";

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
  return (
    <Card
      title={`#${addZeros(ID)}`}
      Icon={() => <div></div>}
      date={""}
      redirect={redirect}
      route={"chat"}
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

  useEffect(() => {
    fetchGroups().then((data) => {
      setGroups(data);
    });
  }, []);

  const filteredGroups = groups.filter((group) => {
    const name = `Grupo ${group}`;
    const description = `Descrição do grupo ${group}`;
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
    </div>
  );
}

export default Groups;
