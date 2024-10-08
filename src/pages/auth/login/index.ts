import { SigninData } from '../../../api/auth-api'
import { Form, Field, Button } from '../../../components'
import { authController } from '../../../controllers/auth-controller'
import { Routes, router } from '../../../modules/Router'

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
    events: {
      submit: (data: SigninData) => {
        authController.login(data)
      },
    },
  }),

  link: new Button({
    text: 'Have no profile?',
    className: 'register-link link',
    events: {
      click: (event: Event) => {
        event.preventDefault()
        router.go(Routes.SignUp)
      },
    },
  }),
}
