import { Form, Input, Button, Link } from '../../../components'
import { render } from '../../../utils/renderDOM'
import Auth from '../Auth'

const login = new Auth({
  title: 'Signin',
  form: new Form({
    fields: [
      new Input({
        name: 'login',
        label: 'Login',
        required: true,
      }),
      new Input({
        name: 'password',
        label: 'Password',
        required: true,
      }),
      new Button({
        text: 'Sign in',
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
    text: 'Have no profile?',
    className: 'register-link',
    href: '/pages/auth/signin/signin',
  }),
})

render('.app', login)
