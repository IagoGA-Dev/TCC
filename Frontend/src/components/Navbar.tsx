import { Link } from "react-router-dom";

function Logo() {
  return (
    <div className="flex-col font-montserrat">
      <h1 className="text-xl font-bold">NomeTemp</h1>
      <h2 className="text-sm font-light">Grupos de Estudo!</h2>
    </div>
  );
}

function NavBarItem(props: {
  to: string;
  children: React.ReactNode;
  active: boolean;
}) {
  return (
    <>
      <Link
        to={props.to}
        className="py-6 px-3 font-montserrat text-gray-600 hover:text-black transition duration-300 flex flex-col items-center group"
      >
        {props.children}
        <div
          className={`border-b-2 ${
            props.active ? "border-black" : "border-gray-300"
          } w-3 rounded-3xl transition-all duration-300 group-hover:border-black 
            group-hover:w-4/5`}
        ></div>
      </Link>
    </>
  );
}

function Navbar(props: { activeItem: string } = { activeItem: "home" }) {
  return (
    <div className="bg-white text-black">
      <div className="container mx-auto flex justify-between">
        <Logo />
        <div className="flex">
          <NavBarItem to="/" active={props.activeItem === "home"}>
            Início
          </NavBarItem>
          <NavBarItem to="/features" active={props.activeItem === "features"}>
            Funcionalidades
          </NavBarItem>
          <NavBarItem to="/info" active={props.activeItem === "info"}>
            Informações
          </NavBarItem>
          <NavBarItem to="/contact" active={props.activeItem === "contact"}>
            Contato
          </NavBarItem>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
