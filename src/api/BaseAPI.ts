import { HTTPTransport } from '../core/htttpTransport'

export abstract class BaseAPI {
  protected http: HTTPTransport
  constructor(endpoint = '') {
    this.http = new HTTPTransport(endpoint)
  }
  public abstract create?(data: unknown): Promise<unknown>
  public abstract request?(identifier?: string): Promise<unknown>
  public abstract update?(identifier: string, data: unknown): Promise<unknown>
  public abstract delete?(identifier: string): Promise<unknown>
}
