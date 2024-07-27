import { template } from './template'
import Block from '../../modules/Block'

export default class Button extends Block {
  constructor(props: any) {
    // Создаём враппер DOM-элемент button
    super('div', props)
  }

  render() {
    const { text, __id } = this.props

    return this.compile(template, this.props)
  }
}
