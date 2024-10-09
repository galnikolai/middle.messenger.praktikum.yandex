import { store } from '../modules/Store'
import { WSTransport } from '../modules/WSTransport'

class MessagesController extends WSTransport {
  constructor() {
    super()
  }

  public async sendMessage(message: string) {
    this.send({
      content: message,
      type: 'message',
    })
  }

  public async getOldMessages() {
    this.send({
      content: '0',
      type: 'get old',
    })
  }

  public connectToApi() {
    store.set('messages', [])

    const wsUrl = `chats/${store.getState().user?.id}/${store.getState().selectedChat}/${
      store.getState().chatToken
    }`

    this.connect(wsUrl, (data) => {
      if (data?.type === 'message') {
        store.set('messages', [data, ...store.getState().messages])
      } else if (Array.isArray(data)) {
        store.set('messages', [...data, ...store.getState().messages])
      } else {
        return
      }
    })
  }
}

export const messagesController = new MessagesController()
