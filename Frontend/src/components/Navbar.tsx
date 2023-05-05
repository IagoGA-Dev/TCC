import { Link } from "react-router-dom";
import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

interface NavBarItemProps {
  to: string;
  children: React.ReactNode;
  active: boolean;
}

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 hover:scale-105 transition duration-300">
      <div className="flex-col font-montserrat">
        <h1 className="text-xl font-bold">NomeTemp</h1>
        <h2 className="text-sm font-light">Grupos de Estudo!</h2>
      </div>
    </Link>
  );
}

function NavBarItem({ to, children, active }: NavBarItemProps) {
  return (
    <Link
      to={to}
      className="py-6 px-3 font-montserrat text-gray-600 hover:text-black transition duration-300 flex flex-col items-center group"
    >
      {children}
      <div
        className={`border-b-2 ${
          active ? "border-black" : "border-gray-300"
        } w-3 rounded-3xl transition-all duration-300 group-hover:border-black 
            group-hover:w-4/5`}
      ></div>
    </Link>
  );
}

interface NavbarProps {
  activeItem: string;
}

function Navbar({ activeItem }: NavbarProps = { activeItem: "home" }) {
  const [isOpen, setIsOpen] = useState(false);

  const NavLinks = (
    <>
      <NavBarItem to="/" active={activeItem === "home"}>
        Início
      </NavBarItem>
      <NavBarItem to="/features" active={activeItem === "features"}>
        Funcionalidades
      </NavBarItem>
      <NavBarItem to="/info" active={activeItem === "info"}>
        Informações
      </NavBarItem>
      <NavBarItem to="/contact" active={activeItem === "contact"}>
        Contato
      </NavBarItem>
      <NavBarItem to="/profile" active={activeItem === "profile"}>
        Perfil
      </NavBarItem>
    </>
  );

  return (
    <div className="bg-white text-black">
      <div className="container mx-auto flex justify-between items-center">
        <Logo />
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <AiOutlineClose className="w-8 h-8" />
            ) : (
              <AiOutlineMenu className="w-8 h-8" />
            )}
          </button>
        </div>
        <div className="hidden md:flex md:items-center md:w-auto w-full">
          {NavLinks}
        </div>
      </div>
      {isOpen && (
        <div className="container mx-auto md:hidden py-4">{NavLinks}</div>
      )}
    </div>
  );
}

export default Navbar;
