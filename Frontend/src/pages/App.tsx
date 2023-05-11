import Sidebar from "../components/Sidebar";
import Home from "./Menus/Home";
import Groups from "./Menus/Groups";
import { useState } from "react";

function App() {
  const [active, setActive] = useState("home");
  return (
    <div className="flex flex-row w-screen h-screen overflow-hidden">
      <Sidebar active={active} setActive={setActive} />
      {
        {
          home: <Home />,
          groups: <Groups />,
          // calendar: <Calendar />,
          // tasks: <Tasks />,
          // settings: <Settings />,
        }[active]
      }
    </div>
  );
}

export default App;
