// Essa classe é responsável por decodificar o token e retornar o usuário logado

import jwtDecode from 'jwt-decode';

class Passport {
  static getUsuario(): Usuario {
    const token = localStorage.getItem('x-access-token');
    if (!token) {
      window.location.href = '/login';
    }

    try {
      const usuario = jwtDecode(token as string) as Usuario;

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

export interface Usuario {
  name: string;
  avatar: string;
  online: boolean;
  role?: string;
  school?: string
}

export default Passport;
