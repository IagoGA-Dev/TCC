import { AiFillHome, AiOutlineSetting, AiFillCalendar } from "react-icons/ai";
import { BiGroup, BiTask } from "react-icons/bi";

const translations: { [key: string]: string } = {
  home: "Ínicio",
  groups: "Grupos",
  calendar: "Calendário",
  tasks: "Tarefas",
  settings: "Configurações"
};

const translate = (active: string) => {
  return translations[active.toLowerCase()] || "";
};

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

interface SidebarProps {
  active: string;
  setActive: (active: string) => void;
}

function Sidebar({ active, setActive }: SidebarProps) {

  function handleActive(title: string) {
    setActive(title);
  }

  return (
    <div className="relative flex flex-col w-16 bg-white py-4 shadow-lg items-center justify-between">
      {/* Avatar */}
      <div className="relative flex flex-col items-center space-y-2 cursor-pointer w-12 group">
        <img
          src="https://picsum.photos/200"
          alt="avatar"
          className="w-10 h-10 rounded-full group-hover:opacity-80 transition duration-300"
        />
        <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-300 rounded-full border-2 border-white"></span>
      </div>

      {/* Ícones */}
      <div className="flex flex-col items-center space-y-6">
        <SidebarItem Icon={AiFillHome} title="Ínicio" active={active} onClick={ () => handleActive("home")}/>
        <SidebarItem Icon={BiGroup} title="Grupos" active={active} onClick={() => handleActive("groups")}/>
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