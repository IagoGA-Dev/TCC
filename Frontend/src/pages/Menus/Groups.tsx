import { useState } from "react";
import Card from "../../components/Card";
import MenuTitle from "../../components/MenuTitle";
import { MdOutlineGroups } from "react-icons/md";

function addZeros(number: number) {
  const zeros = "000";
  return (zeros + number).slice(-zeros.length);
}

interface GroupCardProps {
  id: number;
  name: string;
  description: string;
  image: string;
  members: number;
  date: string;
  redirect: (active: string) => void;
}

function GroupCard({ id, name, description, image, members, date, redirect }: GroupCardProps) {
  return (
    <Card
      title={`#${addZeros(id)}`}
      Icon={() => <div></div>}
      date={""}
      redirect={redirect}
      route={"/chat"}
    >
      <div className="flex flex-col items-center">
        <img
          src={image}
          alt={name}
          className="w-32 h-32 rounded-full mb-4"
        />
        <div className="text-xl font-bold mb-2">{name}</div>
        <div className="text-sm text-center mb-2">{description}</div>
        <div className="text-xs text-gray-500 mb-1">
          Membros: {members}
        </div>
        <div className="text-xs text-gray-500">Criado em: {date}</div>
      </div>
    </Card>
  );
}

function CreateMockGroup({ id, redirect }: { id: number, redirect: (active: string) => void }) {
  return (
    <GroupCard
      id={id}
      name={`Grupo ${id}`}
      description={`Descrição do grupo ${id}`}
      image="https://picsum.photos/200"
      members={id}
      date="01/01/2021"
      redirect={redirect}
    />
  );
}

function Groups({ redirect }: { redirect: (active: string) => void }) {
  // * Estado para a barra de busca
  const [searchTerm, setSearchTerm] = useState("");

  // * Cria um array de grupos
  const groups = Array.from({ length: 10 }, (_, i) => i + 1);

  const filteredGroups = groups.filter((group) => {
    const name = `Grupo ${group}`;
    const description = `Descrição do grupo ${group}`;
    const term = searchTerm.toLowerCase();

    return name.toLowerCase().includes(term) || description.toLowerCase().includes(term);
  });

  return (
    <div>
      <MenuTitle
        icon={<MdOutlineGroups className="inline-block" />}
        title="Grupos"
      >
        <div></div>
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
            <div key={group}>
              <CreateMockGroup id={group} redirect={redirect} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Groups;
