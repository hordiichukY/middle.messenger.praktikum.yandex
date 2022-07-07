type CallbackFn = (...args: unknown[]) => void;
type Listeners = Record<string, CallbackFn[]>

export class EventBus {
  private listeners: Listeners;
  
  constructor() {
    this.listeners = {};
  }
  
  on(event: string, callback: CallbackFn) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
}

  off(event: string, callback: CallbackFn) {
    if (!this.listeners[event]) {
      throw new Error(`No event: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      listener => listener !== callback
    );
  }

  emit(event:string, ...args: unknown[]) {
    if (!this.listeners[event]) {
      return; 
    }

    this.listeners[event].forEach(listener => {
      listener(...args);
    });
  }
}