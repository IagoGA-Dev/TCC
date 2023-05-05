import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import api from "../services/api";

// * Logs email and password

function Login() {
  
  // ! Lidar com setState de error posteriormente
  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    api.post("/usuario/login", {
      Email: e.currentTarget.email.value,
      Senha: e.currentTarget.password.value,
    }).then((res) => {
      console.log(res.data);
    }
    ).catch((err) => {
      console.log(err);
    }
    );
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="max-w-md w-full mx-auto rounded-lg shadow-lg bg-white p-6">
        <h1 className="text-4xl font-bold text-center mb-6">Login</h1>
        <form className="w-full"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin(e);
          }}
        >
          <div className="flex flex-col gap-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="border-2 border-gray-300 rounded-md p-2"
            />
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              name="password"
              id="password"
              className="border-2 border-gray-300 rounded-md p-2"
            />
            <button
              type="submit"
              className="bg-primary text-black font-montserrat py-3 px-5 rounded-sm text-lg transition hover:bg-primary-dark"
            >
              Entrar
            </button>
            <Link
              to="/register"
              className="bg-transparent text-black font-montserrat py-3 px-5 rounded-sm text-lg transition hover:bg-gray-200 group justify-center text-center"
            >
              Registre-se!{" "}
              <AiOutlineArrowRight className="inline-block transition group-hover:translate-x-1" />
            </Link>
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


export default Login;
