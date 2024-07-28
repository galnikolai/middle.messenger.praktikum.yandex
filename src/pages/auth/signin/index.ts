import { Form, Field, Button, Link } from '../../../components'
import { render } from '../../../utils/renderDOM'
import Auth from '../Auth'

const signin = new Auth({
  title: 'Registration',
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
        name: 'name',
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
        name: 'password',
        label: 'Password',
        required: true,
      }),
      new Field({
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
  }),
  link: new Link({
    text: 'Sign in',
    href: '/pages/auth/login/login',
  }),
})

render('.app', signin)
