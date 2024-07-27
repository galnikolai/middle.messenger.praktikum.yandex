import { template } from './template'
import Block from '../../modules/Block'

export default class Input extends Block {
  constructor(props: any) {
    // Создаём враппер DOM-элемент button
    super('div', props)
  }

  render() {
    return this.compile(template, this.props)
  }
}
