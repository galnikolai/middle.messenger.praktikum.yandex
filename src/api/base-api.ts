import { HTTPTransport } from '../modules/HttpsTransport'

export default abstract class BaseAPI {
  protected http: HTTPTransport

  protected constructor(endpoint: string) {
    this.http = new HTTPTransport(endpoint)
  }

  public abstract create?(data: any): Promise<unknown>

  public abstract read?(identifier?: string | number): Promise<unknown>

  public abstract update?(identifier: string | number, data: any): Promise<unknown>

  public abstract delete?(identifier: string | number): Promise<unknown>
}
