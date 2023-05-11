import Sidebar from "../components/Sidebar";
import Home from "./Menus/Home";
import Groups from "./Menus/Groups";
import { useState } from "react";

function App() {
  const [active, setActive] = useState("home");
  return (
    <div className="flex flex-row w-screen h-screen">
      <Sidebar active={active} setActive={setActive} />
      <div className="flex flex-col flex-grow bg-gray-100">
        {
          {
            home: <Home />,
            groups: <Groups />,
            // calendar: <Calendar />,
            // messages: <Messages />,
            // tasks: <Tasks />,
            // settings: <Settings />,
          }[active]
        }
      </div>
    </div>
  );
}

export default App;
