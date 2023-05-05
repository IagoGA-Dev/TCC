import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

type User = {
  ID: number;
  Nome: string;
  Email: string;
  CPF: string;
  ID_Instituicao: number;
};

function Profile() {
  const [userData, setUserData] = useState({} as User);

  function handleLogout() {
    localStorage.removeItem("x-access-token");
    localStorage.removeItem("x-refresh-token");
    window.location.href = "/";
  }

  async function getData() {
    if (!localStorage.getItem("x-access-token")) {
      return;
    }

    try {
      const response = await api.get("/usuario/info", {
        headers: {
          "x-access-token": localStorage.getItem("x-access-token"),
          "x-refresh-token": localStorage.getItem("x-refresh-token"),
        },
      });

      setUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    console.log("useEffect");
    getData();
  }, []);

  return (
    <div className="py-9">
      <Navbar activeItem="profile" />
      {localStorage.getItem("x-access-token") && (
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Dados do usuário</h1>
            {userData && (
              <div className="flex flex-col items-center justify-center">
                <p>ID: {userData.ID}</p>
                <p>Nome: {userData.Nome}</p>
                <p>Email: {userData.Email}</p>
                <p>CPF: {userData.CPF}</p>
                <p>ID_Instituicao: {userData.ID_Instituicao}</p>
              </div>
            )}

            <button
              className="py-2 px-5 mt-4 text-lg text-white bg-red-500 rounded-sm hover:bg-red-600"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {!localStorage.getItem("x-access-token") && (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">Você não está logado</h1>
          </div>
      )  
      }
    </div>
  );
}

export default Profile;
