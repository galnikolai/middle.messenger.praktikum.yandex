import { template } from './template'
import Block from '../../modules/Block'

interface InputProps {
  name?: string
  required?: boolean
  type?: string
  className?: string
  events?: any
  placeholder?: string
}
export default class Input extends Block {
  constructor(props: InputProps) {
    super('input', props)
  }

  render() {
    return this.compile(template, this.props)
  }
}
