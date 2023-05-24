import Sidebar from "../components/Sidebar";
import Home from "./Menus/Home";
import Groups from "./Menus/Groups";
import { useState } from "react";
import Calendar from "./Menus/Calendar";
import Messages from "./Menus/Messages";
import Tasks from "./Menus/Tasks";
import Settings from "./Menus/Settings";
import Chat from "./Menus/Chat";

function App() {
  const [active, setActive] = useState("home");
  const redirect = (name: string) => {
    const validNames = [
      "home",
      "groups",
      "calendar",
      "messages",
      "tasks",
      "settings",
      "chat"
    ];
    if (validNames.includes(name)) {
      setActive(name);
    }
  };
  return (
    <div className="flex flex-row w-screen h-screen">
      <Sidebar active={active} setActive={setActive} />
      <div className="flex flex-col flex-grow bg-gray-100 overflow-y-scroll">
        {
          {
            home: <Home redirect={redirect} />,
            groups: <Groups redirect={redirect} />, 
            calendar: <Calendar />,
            messages: <Messages />,
            tasks: <Tasks />,
            settings: <Settings />,
            chat: <Chat />
          }[active]
        }
      </div>
    </div>
  );
}

export default App;
