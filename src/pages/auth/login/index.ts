import { Form, Field, Button } from '../../../components'
import { router } from '../../../modules/Router'

export const login = {
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

  link: new Button({
    text: 'Have no profile?',
    className: 'register-link link',
    events: {
      click: (event: Event) => {
        event.preventDefault()
        router.go('/sign-up')
      },
    },
  }),
}
