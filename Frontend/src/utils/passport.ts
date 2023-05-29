import jwtDecode from 'jwt-decode';

class Passport {
  static getUsuario(): Usuario {
    const token = localStorage.getItem('x-access-token');
    if (!token) {
      window.location.href = '/login';
    }

    try {
      const usuario = jwtDecode(token as string) as Usuario;

      console.log("Função getUsuario() retornou: ", usuario)
      console.log("Token: ", token)
      console.log("Token decodificado: ", jwtDecode(token as string))

      return usuario;
    } catch (error: any) {
      if (error.name === 'TokenExpiredError') {
        throw new Error('Token expired');
      } else {
        throw new Error('Invalid token');
      }
    }
  }
}

interface Usuario {
  ID: number;
  Nome: string;
  Email: string;
  Senha: string;
  Salt: string;
  CPF: string;
  ID_Instituicao: number;
}

export default Passport;
