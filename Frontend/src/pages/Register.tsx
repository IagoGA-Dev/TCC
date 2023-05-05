import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="max-w-lg w-full mx-auto rounded-lg shadow-lg bg-white p-6">
        <h1 className="text-4xl font-bold text-center mb-6">Cadastro</h1>
        <form className="w-full">
          <div className="flex flex-col gap-4">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              name="nome"
              id="nome"
              className="border-2 border-gray-300 rounded-md p-2"
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="border-2 border-gray-300 rounded-md p-2"
            />
            <label htmlFor="cpf">CPF</label>
            <input
              type="text"
              name="cpf"
              id="cpf"
              className="border-2 border-gray-300 rounded-md p-2"
            />
            <label htmlFor="instituicao">Instituição</label>
            <select
              name="instituicao"
              id="instituicao"
              className="border-2 border-gray-300 rounded-md p-2"
            >
              <option value="ifsp">IFSP - Câmpus Jacareí</option>
              <option value="ifsp">IFSP - Câmpus São José dos Campos</option>
              <option value="ifsp">IFSP - Câmpus Caraguatatuba</option>
              <option value="ifsp">IFSP - Câmpus Campos do Jordão</option>
              <option value="usp">USP</option>
            </select>
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              name="password"
              id="password"
              className="border-2 border-gray-300 rounded-md p-2"
            />
            <label htmlFor="confirmPassword">Confirmar senha</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="border-2 border-gray-300 rounded-md p-2"
            />
            <button
              type="submit"
              className="bg-primary text-black font-montserrat py-3 px-5 rounded-sm text-lg transition hover:bg-primary-dark"
            >
              Registrar
            </button>
            <button
              type="button"
              className="bg-transparent text-black font-montserrat py-3 px-5 rounded-sm text-lg transition hover:bg-gray-200 group"
            >
              Já possuí conta?{" "}
              <AiOutlineArrowRight className="inline-block transition group-hover:translate-x-1" />
            </button>
          </div>
        </form>
        <Link
          to="/"
          className="bg-transparent text-black font-montserrat py-3 px-5 rounded-lg text-lg transition hover:bg-gray-200 group absolute top-5 left-5 transform"
        >
          <AiOutlineArrowLeft className="inline-block transition group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

export default Register;