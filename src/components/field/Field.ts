import { template } from './template'
import Block from '../../modules/Block'

interface FieldProps {
  name: string
  label: string
  required?: boolean
  type?: string
  className?: string
  events?: any
  placeholder?: string
}
export default class Field extends Block {
  constructor(props: FieldProps) {
    super('div', props)
  }

  render() {
    return this.compile(template, this.props)
  }
}
