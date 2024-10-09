import { ChatInfo } from '../../api/chats-api'
import { UserInfo } from '../../api/user-api'
import { authController } from '../../controllers/auth-controller'
import { chatsController } from '../../controllers/chats-controller'

import Block, { BlockProps } from '../../modules/Block'
import { store, withStore } from '../../modules/Store'

import { template } from './template'

export default class ChatsBase extends Block {
  constructor(props: any) {
    super('main', props)
    chatsController.getChats()
    authController.getUser()
  }

  protected componentDidUpdate(_oldProps: BlockProps, newProps: BlockProps): boolean {
    if (!this.element) return true
    const chatContent = this.element.querySelector('.chat-content')
    const messagesContainer: HTMLElement | null = this.element.querySelector('.chat-messages')
    const selectedChat: number | undefined = store.getState().selectedChat

    if (messagesContainer) {
      messagesContainer.innerHTML = ''
    }

    if (newProps?.chats?.length) {
      const chatList = this.element.querySelector('.chat-list')

      if (chatList?.innerHTML) {
        chatList.innerHTML = ''
      }

      newProps.chats.forEach((i: ChatInfo) => {
        const chatItem = this.createDocumentElement('div')
        const chatName = this.createDocumentElement('span')
        const chatLastMessage = this.createDocumentElement('span')

        chatItem.classList.add('chat-item')

        chatName.classList.add('chat-name')
        chatName.textContent = i?.title || ''

        chatLastMessage.classList.add('chat-last-message')
        chatLastMessage.textContent =
          selectedChat === i?.id
            ? newProps.messages[0]?.content || i?.last_message?.content || 'No messages yet'
            : i?.last_message?.content || 'No messages yet'

        chatItem.appendChild(chatName)
        chatItem.appendChild(chatLastMessage)

        chatItem.onclick = () => {
          chatsController.getChatToken(i?.id)
        }

        chatList?.appendChild(chatItem)
      })
    }

    if (newProps?.users?.length) {
      const chatList = this.element.querySelector('.users-list')

      if (chatList?.innerHTML) {
        chatList.innerHTML = ''
      }

      newProps.users.forEach((i: UserInfo) => {
        const chatItem = this.createDocumentElement('div')
        const chatName = this.createDocumentElement('span')

        chatItem.classList.add('chat-item')

        chatName.classList.add('chat-name')
        chatName.textContent = i?.first_name + ' ' + i?.second_name || ''

        chatItem.appendChild(chatName)

        chatItem.onclick = () => chatsController.addUserToChat(i?.id)
        chatList?.appendChild(chatItem)
      })
    }

    if (newProps?.selectedChatUsers?.length) {
      const chatList = this.element.querySelector('.chat-users-list')

      if (chatList?.innerHTML) {
        chatList.innerHTML = ''
      }

      newProps.selectedChatUsers.forEach((i: UserInfo) => {
        const chatItem = this.createDocumentElement('div')
        const chatName = this.createDocumentElement('span')
        const deleteChatUser = this.createDocumentElement('span')

        chatItem.classList.add('chat-item')
        chatName.classList.add('chat-name')
        chatName.textContent = i?.first_name + ' ' + i?.second_name || ''

        deleteChatUser.textContent = 'delete from chat'
        deleteChatUser.onclick = () => chatsController.deleteChatUser(i?.id)
        deleteChatUser.classList.add('delete-button')

        chatItem.appendChild(chatName)
        chatItem.appendChild(deleteChatUser)

        chatList?.appendChild(chatItem)
      })
    }

    if (!selectedChat) {
      chatContent?.classList.add('content-disabled')
    } else {
      chatContent?.classList.remove('content-disabled')
    }

    if (newProps?.messages?.length) {
      newProps?.messages.reverse().map((item: { content: string; user_id: number }) => {
        const message = this.createDocumentElement('div')
        message.textContent = item.content
        message.classList.add('message')
        message.classList.add(newProps?.user.id === item.user_id ? 'sent' : 'received')
        messagesContainer?.prepend(message)
      })

      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer?.scrollHeight
      }
    }

    return false
  }

  render() {
    return this.compile(template, this.props)
  }
}

const withChats = withStore((state: any) => {
  return {
    chats: state.chats || [],
    selectedChat: state.selectedChat || 0,
    selectedChatUsers: state.selectedChatUsers || [],
    users: state.users || [],
    messages: state.messages || [],
    user: state.user || {},
  }
})

export const Chats = withChats(ChatsBase)
