import { store } from '../modules/Store'
import BaseAPI from './base-api'

export interface ChatInfo {
  id: number
  title: string
  avatar: string
  unread_count: number
  created_by: number
  last_message: {
    user: {
      first_name: string
      second_name: string
      avatar: string
      email: string
      login: string
      phone: string
    }
    time: string
    content: string
  }
}

export interface userAddition {
  users: number[]
  chatId: number
}

export class ChatsAPI extends BaseAPI {
  constructor() {
    super('/chats')
  }

  async getChats() {
    return this.http.get('', {})
  }

  async createChat(data: { title: string }) {
    return this.http.post('', {
      data,
    })
  }

  async deleteChat(data: { chatId: string }) {
    return this.http.delete('', {
      data,
    })
  }

  async addUserToChat(data: userAddition) {
    return this.http.put('/users', {
      data,
    })
  }

  async getChatToken(chatToken: number) {
    return this.http.post(`/token/${chatToken}`, {})
  }

  async addUsers(): Promise<any> {
    return this.http.put('/users', {})
  }

  async deleteUsers(data: { users: string[]; chatId: number }): Promise<any> {
    return this.http.delete('/users', { data })
  }

  async getChatsUsers(): Promise<any> {
    return this.http.get(`/${store.getState().selectedChat}/users`, {
      data: {
        id: store.getState().selectedChat,
      },
    })
  }

  create = undefined
  update = undefined
  delete = undefined
  read = undefined
}
