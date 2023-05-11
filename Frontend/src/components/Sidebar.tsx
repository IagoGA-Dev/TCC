import { AiFillHome, AiOutlineSetting, AiFillCalendar } from "react-icons/ai";
import { BiGroup, BiTask } from "react-icons/bi";

interface SidebarItemProps {
  Icon: any;
  title: string;
}

function SidebarItem({ Icon, title }: SidebarItemProps) {
  return (
    <div className="flex flex-col items-center space-y-1 cursor-pointer w-12 group">
      <Icon
        className="w-8 h-8 text-gray-600 group-hover:text-primary-dark transition-all"
        title={title}
      />
      {/* <p className="text-xs text-gray-600 group-hover:text-primary-dark transition-all">
        {convertTitle(title)}
      </p> */}
    </div>
  );
}

function Sidebar() {
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
        <SidebarItem Icon={AiFillHome} title="Início" />
        <SidebarItem Icon={BiGroup} title="Grupos" />
        <SidebarItem Icon={AiFillCalendar} title="Calendário" />
        <SidebarItem Icon={BiTask} title="Tarefas" />
      </div>

      {/* Configurações */}
      <div className="flex flex-col items-center space-y-6">
        <SidebarItem Icon={AiOutlineSetting} title="Configurações" />
      </div>
    </div>
  );
}

export default Sidebar;