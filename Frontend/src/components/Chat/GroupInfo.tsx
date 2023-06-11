// Chat redux
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

function GroupInfo() {
  const name = useSelector((state: RootState) => state.chat.name);
  const description = useSelector((state: RootState) => state.chat.description);
  const image = useSelector((state: RootState) => state.chat.image);
  const members = useSelector((state: RootState) => state.chat.members);
  const createdAt = useSelector((state: RootState) => state.chat.createdAt);
    return (
      <div className="p-4 text-center flex flex-col h-full">
        {/* Imagem do grupo */}
        <img
          src={image}
          alt="Avatar do grupo"
          className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
        />
        <h1 className="text-2xl font-bold mb-2">
          {name}
        </h1>
        {/* Criação */}
        <div className="flex items-center mb-2 pb-2 border-b-2">
          <img
            src="https://picsum.photos/200"
            alt="Avatar do grupo"
            className="w-8 h-8 rounded-full mr-2"
          />
          <span className="text-gray-700 text-sm">Criado por John Doe</span>
        </div>
        {/* Membros */}
        <div className="flex items-center mb-2 relative pb-2 border-b-2">
          <span className="text-gray-700 text-sm mr-2">Membros:</span>
          <img
            src="https://picsum.photos/200"
            alt="Avatar do usuário"
            className="w-6 h-6 rounded-full mr-1"
          />
          <img
            src="https://picsum.photos/500"
            alt="Avatar do usuário"
            className="w-6 h-6 rounded-full mr-1 -ml-4"
          />
          <img
            src="https://picsum.photos/600"
            alt="Avatar do usuário"
            className="w-6 h-6 rounded-full mr-1 -ml-4"
          />
          <span className="text-gray-700 text-sm">+ 3</span>
        </div>
        {/* Descrição */}
        <div className="flex items-center mb-2 pb-2 border-b-2">
          <span className="text-gray-700 text-sm mr-2">Descrição:</span>
          <span className="text-gray-700 text-sm">
            {description}
          </span>
        </div>
        <div className="flex-grow"></div>
        {/* Botões */}
        <button className="rounded-lg py-2 px-4 bg-red-500 text-white font-bold mt-2">
          Sair do grupo
        </button>
        <button className="rounded-lg py-2 px-4 bg-gray-300 text-gray-700 font-bold mt-2">
          Excluir grupo
        </button>
      </div>
    );
  }

export default GroupInfo;