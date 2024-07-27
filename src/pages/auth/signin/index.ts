import { Form, Input, Button, Link } from '../../../components'
import { render } from '../../../utils/renderDOM'
import Auth from '../Auth'

const signin = new Auth({
  title: 'Registration',
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
        name: 'name',
        label: 'Password',
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
        name: 'password',
        label: 'Password',
        required: true,
      }),
      new Input({
        name: 'password-repeat',
        label: 'Password (repeat)',
        required: true,
      }),
      new Button({
        text: 'Sign up',
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
  link: new Link({
    text: 'Sign in',
    href: '/pages/auth/login/login',
  }),
})

render('.app', signin)
