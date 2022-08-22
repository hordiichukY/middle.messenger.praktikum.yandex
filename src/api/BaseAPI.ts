import { HTTPTransport } from '../core/htttpTransport';

export abstract class BaseAPI {
  protected http: HTTPTransport;
  constructor(endpoint = '') {
    this.http = new HTTPTransport(endpoint);
  }
}
