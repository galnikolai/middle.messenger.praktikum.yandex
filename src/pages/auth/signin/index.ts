import { Form, Field, Button } from '../../../components'
import { router } from '../../../modules/Router'

export const signin = {
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

  link: new Button({
    text: 'Sign in',
    className: 'link',
    events: {
      click: (event: Event) => {
        event.preventDefault()
        router.go('/')
      },
    },
  }),
}
