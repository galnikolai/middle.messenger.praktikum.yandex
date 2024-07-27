import { template } from './template'
import Block from '../../modules/Block'
import Input from '../input/Input'

export default class Form extends Block {
  constructor(props: any) {
    // Создаём враппер DOM-элемент button
    console.log(props)
    super('form', props)
  }

  render() {
    const { fields, __id } = this.props

    console.log(fields)
    return this.compile('{{{fields}}}', {
      ...this.props,
      //   fields: fields.map((element) => {
      //     return new Input(element)
      //   }),
    })
  }
}
