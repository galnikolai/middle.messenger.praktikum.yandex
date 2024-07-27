import { Button, Form, Input, Link } from '../../../components'
import { render } from '../../../utils/renderDOM'
import Password from './Password'

const password = new Password({
  form: new Form({
    fields: [
      new Input({
        name: 'oldPassword',
        label: 'Old password',
        required: true,
      }),
      new Input({
        name: 'newPassword',
        label: 'New password',
        required: true,
      }),
      new Input({
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
    events: {
      submit: (event: Event) => {
        event.preventDefault()

        const formObject: { [key: string]: FormDataEntryValue } = {}
        const formData = new FormData(event.target as HTMLFormElement)
        formData.forEach((value, key) => {
          formObject[key] = value
        })
        console.log(formObject)
      },
    },
  }),
  back: new Link({
    text: 'Back',
    className: 'back',
    href: '/pages/settings/profile/profile',
  }),
})

render('.app', password)
