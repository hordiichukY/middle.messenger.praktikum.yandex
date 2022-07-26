import { EventBus } from './EventBus';

export enum WSEvents {
  MESSAGE = 'message',
  CLOSED = 'closed',
  OPEN = 'open',
}

export enum WS_READY_STATE {
  CONNECTING = 0,
  OPEN = 1,
  CLOSING = 2,
  CLOSED = 3,
}

export class WS extends EventBus {
  private _socket: WebSocket;

  constructor(url: string, chatId: number) {
    super();
    this._socket = new WebSocket(url);

    this._socket.addEventListener('open', () => {
      this.emit(WSEvents.OPEN, { chatId });
    });

    this._socket.addEventListener('close', () => {
      this.emit(WSEvents.CLOSED, { chatId });
    });

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    this._socket.addEventListener('error', () => {});

    this._socket.addEventListener('message', ({ data }) => {
      this.emit(WSEvents.MESSAGE, { chatId, message: JSON.parse(data) });
    });
  }

  sendMessage(content: string) {
    this._socket.send(
      JSON.stringify({
        content,
        type: 'message',
      })
    );
  }

  sendPingMessage() {
    this._socket.send(JSON.stringify({ type: 'ping' }));
  }

  getOldMessages() {
    this._socket.send(
      JSON.stringify({
        content: '0',
        type: 'get old',
      })
    );
  }

  get getReadyState() {
    return this._socket.readyState;
  }
}
