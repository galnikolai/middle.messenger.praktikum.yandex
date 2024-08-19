import { Button, Form, Field } from '../../../components'
import { router } from '../../../modules/Router'

export const password = {
  form: new Form({
    fields: [
      new Field({
        name: 'oldPassword',
        label: 'Old password',
        required: true,
      }),
      new Field({
        name: 'newPassword',
        label: 'New password',
        required: true,
      }),
      new Field({
        name: 'newPassword',
        label: 'Repeat password',
        required: true,
      }),
      new Button({
        text: 'Save',
        className: 'save-changes',
        type: 'submit',
      }),
    ],
  }),

  back: new Button({
    text: 'Back',
    className: 'back link',
    events: {
      click: (event: Event) => {
        event.preventDefault()
        router.go('/settings')
      },
    },
  }),
}
