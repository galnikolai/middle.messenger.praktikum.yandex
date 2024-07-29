import { Form, Field, Button, Link } from '../../../components'
import { render } from '../../../utils/renderDOM'
import Auth from '../Auth'

const login = new Auth({
  title: 'Signin',
  form: new Form({
    fields: [
      new Field({
        name: 'login',
        label: 'Login',
        required: true,
      }),
      new Field({
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
  }),
  link: new Link({
    text: 'Have no profile?',
    className: 'register-link',
    href: '/pages/auth/signin/signin',
  }),
})

render('.app', login)
