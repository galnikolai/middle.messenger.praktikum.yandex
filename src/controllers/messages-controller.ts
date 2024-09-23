//

import { store } from '../modules/Store'
import { WSTransport } from '../modules/WSTransport'

class MessagesController extends WSTransport {
  constructor() {
    super()
  }

  public async sendMessage() {
    // try {
    //   const data: XMLHttpRequest = await this.api.getChats()
    //   if (data?.response?.reason) {
    //     throw new Error(data?.response?.reason)
    //   }
    //   store.set('chats', data?.response)
    // } catch (error) {
    //   alert(error)
    // }
  }

  public async getMessages() {
    // try {
    //   const data: XMLHttpRequest = await this.api.createChat()
    //   if (data?.response?.reason) {
    //     throw new Error(data?.response?.reason)
    //   }
    //   //   this.getChats()
    // } catch (error) {
    //   alert(error)
    // }
  }

  public connectToApi() {
    console.log(store.getState())
    const data = this.connect(
      `chats/${store.getState().user?.id}/${store.getState().selectedChat}/${
        store.getState().chatToken
      }`
    )

    console.log(data)
  }
}

export const messagesController = new MessagesController()
