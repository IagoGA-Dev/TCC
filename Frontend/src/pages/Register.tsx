import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import api from "../services/api";

import { useState } from "react";

function Register() {
  const [cpf, setCpf] = useState("");

  const handleCpfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const cpfValue = event.target.value.replace(/\D/g, ""); // Remove all non-numeric characters
    let formattedCpf = cpfValue;

    if (cpfValue.length > 3) {
      formattedCpf = cpfValue.slice(0, 3) + "." + cpfValue.slice(3);
    }

    if (cpfValue.length > 6) {
      formattedCpf = formattedCpf.slice(0, 7) + "." + formattedCpf.slice(7);
    }

    if (cpfValue.length > 9) {
      formattedCpf = formattedCpf.slice(0, 11) + "-" + formattedCpf.slice(11);
    }

    setCpf(formattedCpf);
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="max-w-lg w-full mx-auto rounded-lg shadow-lg bg-white p-6">
        <h1 className="text-4xl font-bold text-center mb-6">Cadastro</h1>
        <form
          className="w-full"
          onSubmit={(e) => {
            e.preventDefault();
            // Obtendo os dados do formulário
            const form = e.target as HTMLFormElement;
            const nome = form.elements.namedItem("nome") as HTMLInputElement;
            const email = form.elements.namedItem("email") as HTMLInputElement;
            const cpf = form.elements.namedItem("cpf") as HTMLInputElement;
            const instituicao = form.elements.namedItem(
              "instituicao"
            ) as HTMLSelectElement;
            const password = form.elements.namedItem(
              "password"
            ) as HTMLInputElement;
            const confirmPassword = form.elements.namedItem(
              "confirmPassword"
            ) as HTMLInputElement;

            // Verificando se as senhas são iguais
            if (password.value !== confirmPassword.value) {
              alert("As senhas não são iguais!");
              return;
            }

            // Enviando os dados para a API
            api
              .post("/usuario", {
                Nome: nome.value,
                Email: email.value,
                CPF: cpf.value.replace(/\D/g, ""), // Remove all non-numeric characters
                ID_Instituicao: instituicao.value,
                Senha: password.value,
              })
              .then(() => {
                alert("Usuário cadastrado com sucesso!");
                window.location.href = "/login";
              })
              .catch((error) => {
                console.log(error);
                // alert("Erro ao cadastrar usuário!");
              });
          }}
        >
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
              value={cpf}
              onChange={handleCpfChange}
              maxLength={14}
            />
            <label htmlFor="instituicao">Instituição</label>
            <select
              name="instituicao"
              id="instituicao"
              className="border-2 border-gray-300 rounded-md p-2"
            >
              <option value="1">IFSP - Câmpus Jacareí</option>
              <option value="2">IFSP - Câmpus São José dos Campos</option>
              <option value="3">IFSP - Câmpus Caraguatatuba</option>
              <option value="4">IFSP - Câmpus Campos do Jordão</option>
              <option value="5">USP</option>
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
            <Link
              to="/login"
              className="text-center bg-transparent text-black font-montserrat py-3 px-5 rounded-sm text-lg transition hover:bg-gray-200 group"
            >
              Já possuí conta?{" "}
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

export default Register;