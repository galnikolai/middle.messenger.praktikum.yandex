import { Form, Field, Button } from '../../../components'
import { authController } from '../../../controllers/auth-controller'
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
        name: 'password',
        label: 'Password',
        required: true,
      }),
      new Button({
        text: 'Sign up',
        className: 'save-changes',
        type: 'submit',
      }),
    ],
    events: {
      submit: (data: any) => {
        authController.signup(data)
      },
    },
  }),

  link: new Button({
    text: 'Sign in',
    className: 'link',
    events: {
      click: (event: Event) => {
        console.log(event)
        event.preventDefault()
        router.go('/')
      },
    },
  }),
}
