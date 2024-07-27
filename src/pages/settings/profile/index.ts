import { Button, Form, Input, Link } from '../../../components'
import { render } from '../../../utils/renderDOM'
import Profile from './Profile'

const profile = new Profile({
  form: new Form({
    fields: [
      new Input({
        name: 'email',
        label: 'Email',
        required: true,
      }),
      new Input({
        name: 'login',
        label: 'Login',
        required: true,
      }),
      new Input({
        name: 'first_name',
        label: 'Name',
        required: true,
      }),
      new Input({
        name: 'second_name',
        label: 'Surname',
        required: true,
      }),
      new Input({
        name: 'phone',
        label: 'Phone number',
        required: true,
      }),
      new Input({
        name: 'display_name',
        label: 'Nickname',
        required: true,
      }),
      new Button({
        text: 'Save changes',
        className: 'save-changes',
        type: 'submit',
      }),
    ],
    events: {
      submit: (event: Event) => {
        event.preventDefault()

        const formObject: { [key: string]: FormDataEntryValue } = {}
        const formData = new FormData(event.target as HTMLFormElement)
        formData.forEach((value, key) => {
          formObject[key] = value
        })
        console.log(formObject)
      },
    },
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
