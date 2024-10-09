import { ChatsAPI } from '../api/chats-api'
import { store } from '../modules/Store'
import { messagesController } from './messages-controller'

class ChatsController {
  api: unknown

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

  public async createChat(info: { title: string }) {
    try {
      const data: XMLHttpRequest = await this.api.createChat(info)

      if (data?.response?.reason) {
        throw new Error(data?.response?.reason)
      }

      const popups = document.querySelectorAll('.popup-container')
      popups.forEach((item) => {
        item?.classList.add('disabled')
        item?.classList.remove('active')
      })

      this.getChats()
    } catch (error) {
      alert(error)
    }
  }

  public async deleteChat() {
    try {
      const data: XMLHttpRequest = await this.api.deleteChat({
        chatId: store.getState().selectedChat,
      })

      if (data?.response?.reason) {
        throw new Error(data?.response?.reason)
      }

      this.getChats()
      store.set('selectedChat', undefined)
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
      messagesController.getOldMessages()
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
