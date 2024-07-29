import { Button, Form, Field, Link } from '../../../components'

import { render } from '../../../utils/renderDOM'
import Profile from './Profile'

const profile = new Profile({
  form: new Form({
    fields: [
      new Field({
        name: 'email',
        label: 'Email',
        required: true,
      }),
      new Field({
        name: 'login',
        label: 'Login',
        required: true,
      }),
      new Field({
        name: 'first_name',
        label: 'Name',
        required: true,
      }),
      new Field({
        name: 'second_name',
        label: 'Surname',
        required: true,
      }),
      new Field({
        name: 'phone',
        label: 'Phone number',
        required: true,
      }),
      new Field({
        name: 'display_name',
        label: 'Nickname',
      }),
      new Button({
        text: 'Save changes',
        className: 'save-changes',
        type: 'submit',
      }),
    ],
  }),
  changePassword: new Button({
    text: 'Change password',
    className: 'change-password',
    events: {
      click: (event: Event) => {
        event.preventDefault()
        location.href = '/pages/settings/password/password'
      },
    },
  }),
  logout: new Link({
    text: 'Log out',
    className: 'logout',
    href: '/pages/auth/login',
  }),
  backToChats: new Link({
    text: 'Back to chats',
    className: 'back',
    href: '/pages/chats/chats',
  }),
})

render('.app', profile)
