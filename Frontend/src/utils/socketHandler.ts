import * as io from 'socket.io-client';
import api from '../services/api';
interface message {
  ID?: number;
  ID_Usuario: number;
  ID_Grupo: number;
  Data: Date;
  Mensagem: string
  Tipo: "Texto" | "Imagem" | "Arquivo";
}

// TODO: onRefreshToken e onDisconnect podem ser alterados para callbacks mais genéricos.

class chatSocketHandler {
  private socket: io.Socket | null;
  private id: number;
  private token: string;
  private refreshToken: string;
  private onRefreshToken: (newToken: string) => void;
  private onDisconnect: (err: string) => void;

  constructor(id: number, token: string, refreshToken: string, onRefreshToken: (newToken: string) => void, onDisconnect: (err: string) => void) {
    this.id = id;
    this.token = token;
    this.refreshToken = refreshToken;
    this.onRefreshToken = onRefreshToken;
    this.onDisconnect = onDisconnect;

    this.socket = io.connect('ws://localhost:3000/chat', {
      query: { ID_Grupo: this.id },
      auth: { token: this.token }
    });

    this.socket.on('connect', () => {
      console.log(`Socket se conectou a: ${this.id}`);
      this.socket?.emit('join', this.id);
    });

    this.socket.on("connect_error", (err: any) => {
      if (err.message === "Acesso negado. Token expirado.") {
        this.refreshTokenHandler();
      } else {
        this.disconnect("Erro ao conectar");
      }
    });
  }

  public onMessage(callback: (message: message) => void) {
    console.log("Atribuindo novo callback!");
    this.socket?.on('receive-message', callback);
  }

  public offMessage(callback: (message: any) => void) {
    console.log("Removendo callback!");
    if (this.socket) { this.socket.off("message", callback); }
  }

  public getMessages(callback: (messages: message[]) => void) {
    this.socket?.on('get-messages', (messages: message[]) => { callback(messages); });
    this.socket?.emit('get-messages');
  }

  public sendMessage(message: message) {
    this.socket?.emit('message', message);
  }

  public disconnect(error: string) {
    this.socket?.disconnect();
    this.onDisconnect(`Socket desconectado: ${error}`);
  }

  private async refreshTokenHandler() {
    const response = await api.post('/usuario/refresh', {
      refreshToken: this.refreshToken,
    });

    if (response.status !== 200) {
      this.disconnect('Erro ao atualizar token'); 
      return;
    }

    this.token = response.data.token;
    // this.refreshToken = response.data.refreshToken;
    this.onRefreshToken(this.token);
  }
}

export default chatSocketHandler;