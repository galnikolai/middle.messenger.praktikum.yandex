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

  async getChats(data: any): Promise<{ id: number }> {
    return this.http.get('', { data })
  }

  async createChat(): Promise<{ id: number }> {
    return this.http.post('', {
      data: {
        title: `Chat #${store.getState().chats?.length || ''}`,
      },
    })
  }

  async addUserToChat(data: userAddition): Promise<{ id: number }> {
    return this.http.put('/users', {
      data,
    })
  }

  async getChatToken(chatToken: number): Promise<{ id: number }> {
    return this.http.post(`/token/${chatToken}`, {})
  }

  async addUsers(data: any): Promise<any> {
    return this.http.put('/users', { data })
  }

  async deleteUsers(data: any): Promise<any> {
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
