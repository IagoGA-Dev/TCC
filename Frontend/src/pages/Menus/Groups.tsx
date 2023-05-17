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
}

function GroupCard(props: GroupCardProps) {
  return (
    <Card
      title={`#${addZeros(props.id)}`}
      redirect={() => {}}
      Icon={() => <div></div>}
      date={""}
    >
      <div className="flex flex-col items-center">
        <img
          src={props.image}
          alt={props.name}
          className="w-32 h-32 rounded-full mb-4"
        />
        <div className="text-xl font-bold mb-2">{props.name}</div>
        <div className="text-sm text-center mb-2">{props.description}</div>
        <div className="text-xs text-gray-500 mb-1">
          Membros: {props.members}
        </div>
        <div className="text-xs text-gray-500">Criado em: {props.date}</div>
      </div>
    </Card>
  );
}

function CreateMockGroup({ id }: { id: number }) {
  return (
    <GroupCard
      id={id}
      name={`Grupo ${id}`}
      description={`Descrição do grupo ${id}`}
      image="https://picsum.photos/200"
      members={id}
      date="01/01/2021"
    />
  );
}

function Groups() {
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
          />
        </div>
        {/* Grupos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
          {Array(10)
            .fill(0)
            .map((_, i) => (
              <CreateMockGroup id={i + 1} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Groups;
