import Block from '../../modules/Block'

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

  render() {
    return this.compile('{{{fields}}}', this.props)
  }
}
