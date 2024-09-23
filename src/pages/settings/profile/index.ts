import { Button, Form, Field } from '../../../components'
import Avatar from '../../../components/avatar/Avatar'
import { authController } from '../../../controllers/auth-controller'
import { userController } from '../../../controllers/user-controller'
import { router } from '../../../modules/Router'

export const profileObj = {
  avatar: new Avatar({
    id: 'avatar',
    className: 'profile-pic',
    events: {
      click: () => {
        const avatarInput: HTMLElement | null = document.getElementById('avatar-input')
        avatarInput?.click()
      },
    },
  }),
  fileForm: new Form({
    id: 'myUserForm',
    className: 'submit-form-data',
    fields: [
      new Field({
        acept: 'image/*',
        name: 'avatar',
        type: 'file',
        id: 'avatar-input',
        events: {
          change: () => {
            const myUserForm: any = document.getElementById('myUserForm')
            const form = new FormData(myUserForm)
            userController.changeAvatar(form)
          },
        },
        parentKey: 'user',
      }),
      new Field({
        type: 'submit',
        parentKey: 'user',
      }),
    ],
  }),
  form: new Form({
    fields: [
      new Field({
        name: 'email',
        label: 'Email',
        required: true,
        parentKey: 'user',
      }),
      new Field({
        name: 'login',
        label: 'Login',
        required: true,
        parentKey: 'user',
      }),
      new Field({
        name: 'first_name',
        label: 'Name',
        required: true,
        parentKey: 'user',
      }),
      new Field({
        name: 'second_name',
        label: 'Surname',
        required: true,
        parentKey: 'user',
      }),
      new Field({
        name: 'phone',
        label: 'Phone number',
        required: true,
        parentKey: 'user',
      }),
      new Field({
        name: 'display_name',
        label: 'Nickname',
        parentKey: 'user',
      }),
      new Button({
        text: 'Save changes',
        className: 'save-changes',
        type: 'submit',
      }),
    ],
    events: {
      submit: () => {
        userController.saveUser()
      },
    },
  }),
  changePassword: new Button({
    text: 'Change password',
    className: 'change-password',
    events: {
      click: (event: Event) => {
        event.preventDefault()
        router.go('/settings/password')
      },
    },
  }),
  logout: new Button({
    text: 'Log out',
    className: 'back logout link',
    events: {
      click: () => {
        authController.logout()
      },
    },
  }),
  backToChats: new Button({
    text: 'Back to chats',
    className: 'back link',
    events: {
      click: (event: Event) => {
        event.preventDefault()
        router.go('/messenger')
      },
    },
  }),
}
