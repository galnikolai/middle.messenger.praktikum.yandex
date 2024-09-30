import { template } from './template'
import Block from '../../modules/Block'
import { store } from '../../modules/Store'

export type ValidationKeys =
  | 'first_name'
  | 'second_name'
  | 'login'
  | 'email'
  | 'password'
  | 'phone'
  | 'message'
  | 'newPassword'
  | 'oldPassword'
  | 'password-repeat'

export const validationRules: Record<ValidationKeys, RegExp> = {
  first_name: /^[A-ZА-Я][a-zа-я-]*$/,
  second_name: /^[A-ZА-Я][a-zа-я-]*$/,
  login: /^(?!\d+$)[a-zA-Z0-9-_]{3,20}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
  newPassword: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
  oldPassword: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
  ['password-repeat']: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
  phone: /^\+?\d{10,15}$/,
  message: /.+/,
}

export const errorMessages: Record<ValidationKeys, string> = {
  first_name: 'Invalid first name',
  second_name: 'Invalid second name',
  login: 'Invalid login',
  email: 'Invalid email',
  newPassword: 'Invalid password',
  oldPassword: 'Invalid password',
  password: 'Invalid password',
  ['password-repeat']: 'Invalid password',
  phone: 'Invalid phone',
  message: 'Message cannot be empty',
}

interface FieldProps {
  name?: string
  label?: string
  required?: boolean
  type?: string
  className?: string
  events?: any
  placeholder?: string
  id?: number | string
  acept?: string
  parentKey?: string
}
export default class Field extends Block {
  constructor(props: FieldProps) {
    const newProps = {
      ...props,
      events: {
        change: (event: any) => {
          event.stopPropagation()
          props?.events?.change(event)
          store.set(`${props.parentKey}.` + props.name, event.target.value)
        },
        blur: (event: any) => {
          event.preventDefault()

          if (event?.target) {
            const fieldName: ValidationKeys = event.target.name
            const value = event.target.value
            const regex: any = validationRules[fieldName]

            if (regex && !regex.test(value)) {
              const element: HTMLElement | null | undefined =
                this.element?.querySelector('#error-message')

              if (element) {
                element.style.display = 'block'
                element.innerText = errorMessages[fieldName]
              }

              return false
            } else {
              const element: HTMLElement | null | undefined =
                this.element?.querySelector('#error-message')

              if (element) {
                element.style.display = 'none'
                element.innerText = ''
              }
              return true
            }
          } else {
            return false
          }
        },
      },
    }

    super('span', newProps)
  }

  render() {
    return this.compile(template, this.props)
  }
}
