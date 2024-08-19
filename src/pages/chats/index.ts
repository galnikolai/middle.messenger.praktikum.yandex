import { Button, Field, Input } from '../../components'
import { router } from '../../modules/Router'

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
  searchInput: new Input({
    placeholder: 'Search',
  }),
  messageInput: new Field({
    placeholder: 'your message',
    name: 'message',
  }),
  sendButton: new Button({
    text: 'Send',
  }),
}
