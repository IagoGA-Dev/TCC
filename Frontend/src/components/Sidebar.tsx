import { AiFillHome, AiOutlineSetting, AiFillCalendar } from "react-icons/ai";
import { BiGroup, BiTask, BiChat } from "react-icons/bi";
import { userData } from "../data";

// Traduções
const translations: { [key: string]: string } = {
  home: "Ínicio",
  groups: "Grupos",
  calendar: "Calendário",
  tasks: "Tarefas",
  messages: "Mensagens",
  settings: "Configurações",
};

const translate = (active: string) => {
  return translations[active.toLowerCase()] || "";
};

// Itens da sidebar
interface SidebarItemProps {
  Icon: any;
  title: string;
  active: string;
  onClick: () => void;
}

function SidebarItem({ Icon, title, active, onClick }: SidebarItemProps) {
  return (
    <div className="flex flex-col items-center space-y-1 cursor-pointer w-12 group" onClick={onClick}>
      <Icon
        className={`w-8 h-8 text-gray-600 group-hover:text-primary-dark transition-all
          ${translate(active) === title ? "text-primary-dark" : ""}`
        }
        title={title}
      />
    </div>
  );
}

// Avatar
interface AvatarProps {
  src: string;
  online: boolean;
}

function Avatar({ src, online }: AvatarProps) {
  return (
    <div className="relative flex flex-col items-center space-y-2 cursor-pointer w-12 group">
      <img
        src={src}
        alt="avatar"
        className="w-11 h-11 rounded-full group-hover:opacity-80 transition duration-300"
      />
      <span className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${online ? "bg-green-300" : "bg-red-300"}`}></span>
    </div>
  );
}

// Sidebar
interface SidebarProps {
  active: string;
  setActive: (active: string) => void;
}

function Sidebar({ active, setActive }: SidebarProps) {

  function handleActive(title: string) {
    setActive(title);
  }

  return (
    <div className="relative flex flex-col w-[64px] min-w-[64px] max-w-[64px] bg-white py-4 shadow-lg items-center justify-between">
      {/* Avatar */}
      <div className="flex flex-col items-center space-y-2">
        <Avatar src={userData.avatar} online={userData.online} />
      </div>

      {/* Ícones */}
      <div className="flex flex-col items-center space-y-6">
        <SidebarItem Icon={AiFillHome} title="Ínicio" active={active} onClick={ () => handleActive("home")}/>
        <SidebarItem Icon={BiGroup} title="Grupos" active={active} onClick={() => handleActive("groups")}/>
        <SidebarItem Icon={BiChat} title="Mensagens" active={active} onClick={() => handleActive("messages")}/>
        <SidebarItem Icon={AiFillCalendar} title="Calendário" active={active} onClick={() => handleActive("calendar")}/>
        <SidebarItem Icon={BiTask} title="Tarefas" active={active} onClick={() => handleActive("tasks")}/>
      </div>

      {/* Configurações */}
      <div className="flex flex-col items-center space-y-6">
        <SidebarItem Icon={AiOutlineSetting} title="Configurações" active={active} onClick={() => handleActive("settings")}/>
      </div>
    </div>
  );
}

export default Sidebar;