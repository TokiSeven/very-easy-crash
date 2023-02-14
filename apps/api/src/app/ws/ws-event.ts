import { Socket } from 'socket.io';
import { GameProvider } from '../game/provider';

export abstract class WSEvent<T = unknown> {
  constructor(protected provider: GameProvider) {}

  abstract name: string;

  abstract payload(): Promise<T>;

  async emitTo(socket: Socket) {
    console.log(
      `emits ${this.name} to ${socket.id} with status ${socket.emit(
        this.name,
        await this.payload()
      )}`
    );
  }
}
