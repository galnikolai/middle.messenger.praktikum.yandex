import Block from '../../modules/Block'
import { template } from './template'

export default class Error extends Block {
  constructor(props: any) {
    super('div', props)
  }

  render() {
    return this.compile(template, this.props)
  }
}
