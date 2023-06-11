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
import { changeGroup, changeGroupID } from "../../redux/chatSlice";
import { RootState } from "../../redux/store";

// Usuraio

interface Group {
  ID: number;
  Nome: string;
  Categoria: string;
  Descricao: string;
  Imagem: string;
  Membros: number;
  createdAt: Date;
  Privado: boolean;
}

function addZeros(number: number) {
  const zeros = "000";
  return (zeros + number).slice(-zeros.length);
}

async function fetchGroups() {
  const response = await api.get("/grupo/");
  let data = await response.data;
  // Remove grupos privados
  data = data.filter((group: Group) => !group.Privado);
  return data;
  // console.log(data);
  // return data;
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

  interface handleClickProps {
    Group_ID: number;
    name: string;
    description: string;
    image: string;
    members: number;
    createdAt: Date;
    dispatch: any;
  }
  
  function handleClick({
    Group_ID,
    name,
    description,
    image,
    members,
    createdAt,
    dispatch,
  }: handleClickProps) {
    console.log("Group_ID: ", Group_ID);
    console.log("name: ", name);
    console.log("description: ", description);
    console.log("image: ", image);
    console.log("members: ", members);
    console.log("createdAt: ", createdAt);
    dispatch(changeGroup({ ID: Group_ID, name, description, image, members, createdAt }));
  }

  return (
    <Card
      title={`#${addZeros(ID)}`}
      Icon={() => <div></div>}
      date={""}
      redirect={redirect}
      route={"chat"}
      onClick={() => handleClick({ Group_ID: ID, name: Nome, description: Descricao, image: Imagem, members: Membros, createdAt, dispatch })}
    >
      <div className="flex flex-col items-center">
        <img src={Imagem} alt={Nome} className="w-32 h-32 rounded-full mb-4 object-cover" />
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
          <form
            className="flex flex-col gap-4 mt-3"
            onSubmit={(e) => {

              interface Group {
                Nome: string;
                Descricao: string;
                Categoria: string;
                Privado: boolean;
                Imagem: string;
              }

              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const nome = form.elements.namedItem("nome") as HTMLInputElement;
              const descricao = form.elements.namedItem("descricao") as HTMLInputElement;
              const categoria = form.elements.namedItem("categoria") as HTMLInputElement;
              const imagem = form.elements.namedItem("imagem") as HTMLInputElement;
              const privado = form.elements.namedItem("privado") as HTMLInputElement;

              console.log("====================================");
              console.log(`
                Nome: ${nome.value}
                Descricao: ${descricao.value}
                Categoria: ${categoria.value}
                Privado: ${privado.value}
                Imagem: ${imagem.value}
              `);
              console.log("====================================");

              api.post("/grupo/", {
                ID_Criador: 4,
                ID_Instituicao: 1,
                Nome: nome.value,
                Descricao: descricao.value,
                Categoria: categoria.value,
                Privado: privado.value ? "false" : "true",
                Imagem: imagem.value,
              }).then((response) => {
                // alert("Grupo criado com sucesso!");
                setShowModal(false);
                fetchGroups().then((data) => {
                  setGroups(data);
                });
              }).catch((error) => {
                alert("Erro ao criar grupo!");
              });
            }}
          >
            <label className="flex flex-col">
              <span className="text-sm text-gray-500 mb-2">Nome do Grupo</span>
              <input
                name="nome"
                id="nome"
                type="text"
                className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-sm text-gray-500 mb-2">
                Descrição do Grupo
              </span>
              <input
                name="descricao"
                id="descricao"
                type="text"
                className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-sm text-gray-500 mb-2">Categoria</span>
              <select
                name="categoria"
                id="categoria"
                className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue="default"
              >
                <option value="default" disabled>
                  Selecione uma categoria
                </option>
                <option value="Categoria 1">Categoria 1</option>
                <option value="Categoria 2">Categoria 2</option>
                <option value="Categoria 3">Categoria 3</option>
              </select>
            </label>
            <label className="flex flex-col">
              {/* Temporáriamente até eu descobrir como vou fazer o upload da imagem */}
              {/* O problema é abrir a porta para alguma vulnerabilidade */}
              <span className="text-sm text-gray-500 mb-2">Imagem (URL)</span>
              <input
                name="imagem"
                id="imagem"
                type="text"
                className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>

              <div className="flex items-center gap-2">
                <input
                  name="privado"
                  id="privado"
                  type="checkbox"
                  className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-500 mb-2">Privado</span>
              </div>
            
            <div className="flex justify-start gap-4 mt-6 font-medium font-montserrat">
              <div className="flex-1">
                <DarkButton
                  icon={<></>}
                  text="Criar"
                  type="submit"
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
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Groups;
