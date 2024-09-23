import { ChatsAPI } from '../api/chats-api'
import { store } from '../modules/Store'
import { messagesController } from './messages-controller'

class ChatsController {
  api: any

  constructor() {
    this.api = new ChatsAPI()
  }

  public async getChats() {
    try {
      const data: XMLHttpRequest = await this.api.getChats()

      if (data?.response?.reason) {
        throw new Error(data?.response?.reason)
      }

      store.set('chats', data?.response)
    } catch (error) {
      alert(error)
    }
  }

  public async createChat() {
    try {
      const data: XMLHttpRequest = await this.api.createChat()

      if (data?.response?.reason) {
        throw new Error(data?.response?.reason)
      }

      this.getChats()
    } catch (error) {
      alert(error)
    }
  }

  public async addUserToChat(userId: number) {
    try {
      const data: XMLHttpRequest = await this.api.addUserToChat({
        users: [userId],
        chatId: store.getState().selectedChat,
      })

      if (data?.response?.reason) {
        throw new Error(data?.response?.reason)
      }

      this.getChats()
    } catch (error) {
      alert(error)
    }
  }

  public async deleteChatUser(userId: number) {
    try {
      const data: XMLHttpRequest = await this.api.deleteUsers({
        users: [userId],
        chatId: store.getState().selectedChat,
      })

      if (data?.response?.reason) {
        throw new Error(data?.response?.reason)
      }

      this.getChatUsers()
    } catch (error) {
      alert(error)
    }
  }

  public async getChatToken(chatToken: number) {
    try {
      if (store.getState().selectedChat) {
        messagesController.close()
      }

      store.set('selectedChat', chatToken)

      const data: XMLHttpRequest = await this.api.getChatToken(chatToken)

      if (data?.response?.reason) {
        throw new Error(data?.response?.reason)
      }

      store.set('chatToken', data.response.token)
      messagesController.connectToApi()
    } catch (error) {
      alert(error)
    }
  }

  public async getChatUsers() {
    try {
      const data: XMLHttpRequest = await this.api.getChatsUsers()

      if (data?.response?.reason) {
        throw new Error(data?.response?.reason)
      }

      store.set('selectedChatUsers', data.response)
    } catch (error) {
      alert(error)
    }
  }
}

export const chatsController = new ChatsController()
