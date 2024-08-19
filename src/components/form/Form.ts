import Block from '../../modules/Block'
import { ValidationKeys, validationRules, errorMessages } from '../field/Field'

export default class Form extends Block {
  constructor(props: any) {
    const newProps = {
      ...props,
      events: {
        submit: (event: Event) => {
          event.preventDefault()

          const errors: string[] = []
          Array.from(this.element?.children || []).forEach((el) => {
            const input = el.querySelector('input')
            const fieldName = input?.getAttribute('name') as ValidationKeys
            const value = input?.value

            const regex: any = validationRules[fieldName]

            if (regex && !regex.test(value)) {
              const element: HTMLElement | null = el?.querySelector('#error-message')

              if (element) {
                element.style.display = 'block'
                element.innerText = errorMessages[fieldName]
              }

              return false
            } else {
              const element: HTMLElement | null = el?.querySelector('#error-message')

              if (element) {
                element.style.display = 'none'
                element.innerText = ''
              }
              return true
            }
          })

          if (errors.length) {
            console.log('Field errors')
          }
          const formObject: { [key: string]: FormDataEntryValue } = {}
          const formData = new FormData(event.target as HTMLFormElement)
          formData.forEach((value, key) => {
            formObject[key] = value
          })
        },
      },
    }
    super('form', newProps)
  }

  render() {
    return this.compile('{{{fields}}}', this.props)
  }
}
