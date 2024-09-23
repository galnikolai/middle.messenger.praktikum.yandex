import { Button, Field, Input } from '../../components'
import Popup from '../../components/popup/Popup'
import { chatsController } from '../../controllers/chats-controller'
import { messagesController } from '../../controllers/messages-controller'
import { userController } from '../../controllers/user-controller'
import { router } from '../../modules/Router'
import ChatUsersList from './chat-user-list/ChatUsersList'
import { usersList } from './users-list'
import UsersList from './users-list/UsersList'

export const chats = {
  profileLink: new Button({
    text: 'Profile >',
    className: 'profile-link link',
    events: {
      click: (event: Event) => {
        event.preventDefault()
        router.go('/settings')
      },
    },
  }),
  createChat: new Button({
    text: 'Create new chat',
    className: 'profile-link link',
    events: {
      click: (event: Event) => {
        event.preventDefault()
        chatsController.createChat()
      },
    },
  }),
  editUsers: new Popup({
    button: new Button({
      text: 'Manage chat participants',
      className: 'profile-link link',
      events: {
        click: (event: Event) => {
          event.preventDefault()
          chatsController.getChatUsers()
        },
      },
    }),
    content: new ChatUsersList({}),
  }),
  addUsers: new Popup({
    button: new Button({
      text: 'Add new users',
      className: 'profile-link link',
      events: {
        click: (event: Event) => {
          event.preventDefault()
          userController.searchUsers('')
        },
      },
    }),
    content: new UsersList(usersList),
  }),
  searchInput: new Input({
    placeholder: 'Search',
  }),
  messageInput: new Field({
    placeholder: 'your message',
    name: 'message',
    id: 'message-input',
  }),
  sendButton: new Button({
    text: 'Send',
    events: {
      click: (event: Event) => {
        event.preventDefault()
        const inputValue: any = document.querySelector('#message-input')

        messagesController.sendMessage(inputValue?.value)
      },
    },
  }),
}
