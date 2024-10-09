import { Button, Field, Form, Input } from '../../components'
import Popup from '../../components/popup/Popup'
import { chatsController } from '../../controllers/chats-controller'
import { messagesController } from '../../controllers/messages-controller'
import { userController } from '../../controllers/user-controller'
import { Routes, router } from '../../modules/Router'
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
        router.go(Routes.Settings)
      },
    },
  }),
  createChat: new Popup({
    button: new Button({
      text: 'Create new chat',
      className: 'profile-link link',
    }),
    content: new Form({
      fields: [
        new Field({
          name: 'title',
          label: 'Title',
          required: true,
        }),
        new Button({
          text: 'Create',
          className: 'сreate',
          type: 'submit',
        }),
      ],
      events: {
        submit: (data: { title: string }) => {
          chatsController.createChat(data)
        },
      },
    }),
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
  deleteChat: new Button({
    text: 'Delete chat',
    className: 'profile-link link',
    events: {
      click: (event: Event) => {
        event.preventDefault()
        chatsController.deleteChat()
      },
    },
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
        const inputValue: unknown = document.querySelector('#message-input')

        messagesController.sendMessage(inputValue?.value)
        inputValue.value = ' '
        inputValue.focus()
      },
    },
  }),
}
