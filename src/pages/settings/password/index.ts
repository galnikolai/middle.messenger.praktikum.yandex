import { Button, Form, Field, Link } from '../../../components'
import { render } from '../../../utils/renderDOM'
import Password from './Password'

const password = new Password({
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
  back: new Link({
    text: 'Back',
    className: 'back',
    href: '/pages/settings/profile/profile',
  }),
})

render('.app', password)
