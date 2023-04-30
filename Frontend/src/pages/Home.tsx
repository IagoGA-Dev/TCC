import Navbar from "../components/Navbar";
import Notebook from "../assets/notebook.svg";

function Home() {
  return (
    <div className="py-9">
      <Navbar />
      <div className="px-40 py-32 grid grid-cols-2 items-center gap-20">
        <div>
          {/* Headline */}

          <h1 className="font-merriweather font-bold text-3xl">
            Estude de forma descomplicada
          </h1>

          {/* Texto */}
          <div className="leading-7 w-4/5">
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

          {/* "Call for action" <- Botões */}
          <div className="flex-row pt-6">
            <button
              className="bg-primary text-black font-montserrat py-3 px-5 rounded-sm text-lg transition hover:bg-primary-dark">
              Entre Agora!
            </button>
            <button
              className="bg-transparent text-black font-montserrat py-3 px-5 rounded-sm text-lg">
              Registre-se!
            </button>
          </div>
        </div>
        <div>
          <img src={Notebook} alt="Notebook" />
        </div>
      </div>
    </div>
  );
}

export default Home;
