import { Button, Form, Field } from '../../../components'
import Avatar from '../../../components/avatar/Avatar'
import { userController } from '../../../controllers/user-controller'
import { Routes, router } from '../../../modules/Router'

export const password = {
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
            const myUserForm: HTMLElement | null = document.getElementById('myUserForm')
            if (myUserForm) {
              const form = new FormData(myUserForm as HTMLFormElement)
              userController.changeAvatar(form)
            }
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
        name: 'oldPassword',
        label: 'Old password',
        required: true,
        parentKey: 'password',
      }),
      new Field({
        name: 'newPassword',
        label: 'New password',
        required: true,
        parentKey: 'password',
      }),
      new Field({
        name: 'repeatNewPassword',
        label: 'Repeat password',
        required: true,
        parentKey: 'password',
      }),
      new Button({
        text: 'Save',
        className: 'save-changes',
        type: 'submit',
        id: 'save-changes',
      }),
    ],
    events: {
      submit: () => {
        userController.changePassword()
      },
    },
  }),

  back: new Button({
    text: 'Back',
    className: 'back link',
    events: {
      click: (event: Event) => {
        event.preventDefault()
        router.go(Routes.Settings)
      },
    },
  }),
}
