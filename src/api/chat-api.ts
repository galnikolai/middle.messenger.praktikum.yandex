import { HTTPTransport } from '../modules/HttpsTransport'
import { BaseAPI } from './base-api'

const chatAPIInstance = new HTTPTransport('api/v1/chats')

export class ChatAPI extends BaseAPI {
  create() {
    // Здесь уже не нужно писать полный путь /api/v1/chats/
    return chatAPIInstance.post('/', { title: 'string' })
  }

  // request({ id }: {id: string}) {
  //   return chatAPIInstance.get(`/${id}`)
  // }
}
