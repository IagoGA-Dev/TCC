import Navbar from "../components/Navbar";
import Notebook from "../assets/notebook.svg";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="py-9">
      <Navbar activeItem="home" />
      <div className="px-6 md:px-40 py-12 md:py-32 grid grid-cols-1 lg:grid-cols-2 items-center gap-20">
        <div className="m-14">
          <h1 className="font-merriweather font-bold text-3xl md:text-4xl">
            Estude de forma descomplicada
          </h1>
          <div className="leading-7 w-full md:w-4/5">
            <ul className="font-poppins list-disc pt-6">
              <li>
                Encontre e conecte-se com vários estudantes que compartilham
                seus interesses e objetivos.
              </li>
              <li>
                Acesse e compartilhe suas dúvidas em grupos personalizados dos
                mais variados temas.
              </li>
              <li>
                Tenha a segurança de poder conversar em um grupo moderado por
                sua própria instituição.
              </li>
            </ul>
            <p>Tudo isso em uma plataforma online gratuita e fácil de usar!</p>
          </div>
          <div className="flex-row pt-6 flex gap-4">
            <Link to="/login" className="bg-primary text-black font-montserrat py-3 px-5 rounded-sm text-lg transition hover:bg-primary-dark">
              Entre Agora!
            </Link>
            <button
              className="bg-transparent text-black font-montserrat py-3 px-5 rounded-sm text-lg transition hover:bg-gray-200 group
           "
            >
              Registre-se!{" "}
              <AiOutlineArrowRight className="inline-block transition group-hover:translate-x-1" />
            </button>
          </div>
        </div>
        <div className="md:justify-self-end">
          <img src={Notebook} alt="Notebook" />
        </div>
      </div>
    </div>
  );
}

export default Home;