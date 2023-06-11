// Essa classe é responsável por decodificar o token e retornar o usuário logado

import jwtDecode from 'jwt-decode';
import api from '../services/api';

class Passport {
  static getUsuario(): Usuario {
    try {
    const token = localStorage.getItem('x-access-token') || "";
    if (!this.validateToken(token)) { this.refreshToken(); }

    const usuario = jwtDecode(token as string) as Usuario;
    return usuario;
  } catch (err) {
    return {
      name: '',
      avatar: '',
      online: false,
      exp: 0,
    };
    }
  }

  static validateToken(token: string) {
    try {
      const decode = jwtDecode(token) as { exp: number }
      if (decode.exp < Date.now() / 1000) {
        return false;
      }
      return true;
    } catch (err) {
      return false;
    }
  }

  static async refreshToken(){
    console.log("Obtendo novo Token...")
    const refreshToken = localStorage.getItem('x-refresh-token') || "";


    if (!refreshToken) { window.location.href = '/login'; }

    await api.post('/usuario/refresh', {
      refreshToken: refreshToken,
    }).then((response) => {
      if(response.status !== 200) { window.location.href = '/login'; }
      console.log(`Novo token obtido com sucesso: ${response.data.token}`);
      localStorage.setItem('x-access-token', response.data.token);
      localStorage.setItem('x-refresh-token', response.data.refreshToken);

      window.location.reload();
    }).catch(() => {
      window.location.href = '/login';
    });
  }
}

export interface Usuario {
  id?: number;
  name: string;
  avatar: string;
  online: boolean;
  role?: string;
  school?: string
  exp: number;
}

export default Passport;
