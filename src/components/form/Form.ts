import Block from '../../modules/Block'

export default class Form extends Block {
  constructor(props: any) {
    // Создаём враппер DOM-элемент button
    console.log(props)
    super('form', props)
  }

  render() {
    return this.compile('{{{fields}}}', this.props)
  }
}
