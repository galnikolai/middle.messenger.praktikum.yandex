import { template } from './template'
import Block from '../../modules/Block'

interface ButtonProps {
  text: string
  className?: string
  type?: string
  events?: any
}
export default class Button extends Block {
  constructor(props: ButtonProps) {
    super('div', props)
  }

  render() {
    return this.compile(template, this.props)
  }
}
