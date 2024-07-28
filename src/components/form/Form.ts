import Block from '../../modules/Block'

// const validationRules: { [key: string]: RegExp } = {
//   first_name: /^[A-ZА-Я][a-zа-я-]*$/,
//   second_name: /^[A-ZА-Я][a-zа-я-]*$/,
//   login: /^(?!\d+$)[a-zA-Z0-9-_]{3,20}$/,
//   email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//   password: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
//   phone: /^\+?\d{10,15}$/,
//   message: /.+/,
// }

export default class Form extends Block {
  constructor(props: any) {
    const newProps = {
      ...props,
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
    }
    super('form', newProps)
  }

  // validate() {
  //   const fieldName = field.name
  //   const value = field.value
  //   const regex = validationRules[fieldName]

  //   if (regex && !regex.test(value)) {
  //     document.getElementById(`${fieldName}_error`).style.display = 'block'
  //     return false
  //   } else {
  //     document.getElementById(`${fieldName}_error`).style.display = 'none'
  //     return true
  //   }
  // }

  render() {
    console.log(this.lists.fields)
    return this.compile('{{{fields}}}', this.props)
  }
}
