import * as io from 'socket.io-client';
import api from '../services/api';

interface message {
  message: string;
  type: "text" | "image" | "file";
  id: number;
}

class chatSocketHandler {
  private socket: io.Socket | null;
  private id: number;
  private token: string;
  private refreshToken: string;
  private onRefreshToken: (newToken: string) => void;
  private onDisconnect: () => void;

  constructor(id: number, token: string, refreshToken: string, onRefreshToken: (newToken: string) => void, onDisconnect: () => void) {
    this.id = id;
    this.token = token;
    this.refreshToken = refreshToken;
    this.socket = null;
    this.onRefreshToken = onRefreshToken;
    this.onDisconnect = onDisconnect;
  }

  public connect() {
    this.socket = io.connect('http://localhost:3000/chat', {
      auth: {
        ID_Grupo: this.id,
        token: this.token,
      }
    })

    this.socket.on('connect_error', (err: any) => {
      if (err.message === 'Acesso negado. Token expirado.') {
        this.refreshTokenHandler();
      } else {
        this.disconnect();
      }
    }
    );
  }

  public onMessage(callback: (message: message) => void) {
    this.socket?.on('receive-message', callback);
  }

  public sendMessage(message: message) {
    this.socket?.emit('message', message);
  }

  public disconnect() {
    this.socket?.disconnect();
    this.onDisconnect();
  }

  private async refreshTokenHandler() {
    const response = await api.post('/usuario/refresh', {
      refreshToken: this.refreshToken,
    });

    if (response.status !== 200) {
      this.disconnect();
      return;
    }

    this.token = response.data.token;
    this.refreshToken = response.data.refreshToken;
    this.onRefreshToken(this.token);
  }
}

export default chatSocketHandler;