import { Button, Field, Input, Link } from '../../components'
import { render } from '../../utils/renderDOM'
import Chats from './Chats'

const chats = new Chats({
  profileLink: new Link({
    className: 'profile-link',
    href: '/pages/settings/profile/profile',
    text: 'Profile >',
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
})

render('.app', chats)
