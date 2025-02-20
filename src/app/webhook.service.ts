import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
    private socket!: Socket; 
  constructor() {}

  connect(sessionId: string) {
    // Si ya hay una conexión, desconéctala antes de crear una nueva
    if (this.socket) {
      this.socket.disconnect();
    }

    this.socket = io('http://localhost:3000', {
      auth: {
        token: 'a6bc226axxxxxxxxxxxxxx'
      },
      query: {
        session_id: sessionId
      }
    });
  }

  onEvent(eventName: string, callback: (data: any) => void) {
    this.socket.on(eventName, callback);
  }
}
